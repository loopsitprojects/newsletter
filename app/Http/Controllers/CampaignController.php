<?php

namespace App\Http\Controllers;

use App\Jobs\SendCampaignBatchJob;
use App\Models\ActivityLog;
use App\Models\Campaign;
use App\Models\CampaignLog;
use App\Models\EmailTemplate;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CampaignController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Campaign::with(['template', 'group']);

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        $campaigns = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Campaigns/Index', [
            'campaigns' => $campaigns,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function create(Request $request): Response
    {
        $templates = EmailTemplate::all()->map(function ($t) {
            $t->content_html = self::normalizeMediaUrls($t->content_html);

            return $t;
        });
        $groups = SubscriberGroup::withCount('subscribers')->get();
        $initialTemplateId = $request->query('template_id');

        return Inertia::render('Campaigns/Create', [
            'templates' => $templates,
            'groups' => $groups,
            'initialTemplateId' => $initialTemplateId ? (int) $initialTemplateId : null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'sender_name' => 'nullable|string|max:100',
            'sender_email' => 'nullable|email|max:100',
            'content_html' => 'required|string',
            'template_id' => 'nullable|exists:email_templates,id',
            'target_type' => 'required|in:all,group',
            'subscriber_group_id' => 'nullable|required_if:target_type,group|exists:subscriber_groups,id',
            'action' => 'required|in:draft,send_now,schedule',
            'scheduled_at' => 'nullable|required_if:action,schedule|date|after:now',
        ]);

        $status = 'draft';
        if ($validated['action'] === 'schedule') {
            $status = 'scheduled';
        }

        $senderEmail = $validated['sender_email'] ?? null;
        if (! $senderEmail || str_contains($senderEmail, 'example.com') || str_contains($senderEmail, 'loops.lk')) {
            $senderEmail = config('mail.from.address');
        }

        $campaign = Campaign::create([
            'title' => $validated['title'],
            'subject' => $validated['subject'],
            'sender_name' => $validated['sender_name'] ?? config('app.name'),
            'sender_email' => $senderEmail,
            'content_html' => self::normalizeMediaUrls($validated['content_html']),
            'template_id' => $validated['template_id'] ?? null,
            'target_type' => $validated['target_type'],
            'subscriber_group_id' => $validated['subscriber_group_id'] ?? null,
            'status' => $status,
            'scheduled_at' => $validated['action'] === 'schedule' ? $validated['scheduled_at'] : null,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'campaign.created',
            'description' => "Created campaign '{$campaign->title}' ({$campaign->status})",
            'properties' => ['campaign_id' => $campaign->id],
            'ip_address' => $request->ip(),
        ]);

        if ($validated['action'] === 'send_now') {
            $this->dispatchCampaign($campaign);

            return redirect()->route('campaigns.show', $campaign->id)->with('success', 'Campaign emails queued in batches of 50!');
        }

        return redirect()->route('campaigns.index')->with('success', 'Campaign saved successfully.');
    }

    public function show(Campaign $campaign): Response
    {
        $campaign->load(['template', 'group']);
        $campaign->content_html = self::normalizeMediaUrls($campaign->content_html);

        $logs = CampaignLog::with('subscriber')
            ->where('campaign_id', $campaign->id)
            ->orderBy('updated_at', 'desc')
            ->paginate(15);

        // Count queued, sent, and failed logs for queue monitoring
        $queuedCount = CampaignLog::where('campaign_id', $campaign->id)->where('status', 'queued')->count();
        $failedCount = CampaignLog::where('campaign_id', $campaign->id)->where('status', 'failed')->count();

        $campaignData = array_merge($campaign->toArray(), [
            'queued_count' => $queuedCount,
            'failed_count' => $failedCount,
        ]);

        return Inertia::render('Campaigns/Show', [
            'campaign' => $campaignData,
            'logs' => $logs,
        ]);
    }

    public function edit(Campaign $campaign): Response
    {
        $campaign->content_html = self::normalizeMediaUrls($campaign->content_html);
        $templates = EmailTemplate::all()->map(function ($t) {
            $t->content_html = self::normalizeMediaUrls($t->content_html);

            return $t;
        });
        $groups = SubscriberGroup::withCount('subscribers')->get();

        return Inertia::render('Campaigns/Edit', [
            'campaign' => $campaign,
            'templates' => $templates,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, Campaign $campaign): RedirectResponse
    {
        if ($campaign->status === 'sent') {
            return back()->with('error', 'Cannot edit a campaign that has already been sent.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'sender_name' => 'nullable|string|max:100',
            'sender_email' => 'nullable|email|max:100',
            'content_html' => 'required|string',
            'template_id' => 'nullable|exists:email_templates,id',
            'target_type' => 'required|in:all,group',
            'subscriber_group_id' => 'nullable|required_if:target_type,group|exists:subscriber_groups,id',
            'action' => 'required|in:draft,send_now,schedule',
            'scheduled_at' => 'nullable|required_if:action,schedule|date',
        ]);

        $status = $campaign->status;
        if ($validated['action'] === 'draft') {
            $status = 'draft';
        } elseif ($validated['action'] === 'schedule') {
            $status = 'scheduled';
        }

        $senderEmail = $validated['sender_email'] ?? null;
        if (! $senderEmail || str_contains($senderEmail, 'example.com') || str_contains($senderEmail, 'loops.lk')) {
            $senderEmail = config('mail.from.address');
        }

        $campaign->update([
            'title' => $validated['title'],
            'subject' => $validated['subject'],
            'sender_name' => $validated['sender_name'] ?? config('app.name'),
            'sender_email' => $senderEmail,
            'content_html' => self::normalizeMediaUrls($validated['content_html']),
            'template_id' => $validated['template_id'] ?? null,
            'target_type' => $validated['target_type'],
            'subscriber_group_id' => $validated['subscriber_group_id'] ?? null,
            'status' => $status,
            'scheduled_at' => $validated['action'] === 'schedule' ? $validated['scheduled_at'] : null,
        ]);

        if ($validated['action'] === 'send_now') {
            $this->dispatchCampaign($campaign);

            return redirect()->route('campaigns.show', $campaign->id)->with('success', 'Campaign emails queued in batches of 50!');
        }

        return redirect()->route('campaigns.index')->with('success', 'Campaign updated successfully.');
    }

    public function sendNow(Campaign $campaign): RedirectResponse
    {
        if ($campaign->status === 'sent') {
            return back()->with('error', 'Campaign has already been sent.');
        }

        $this->dispatchCampaign($campaign);

        return back()->with('success', 'Campaign emails queued in batches of 50!');
    }

    public function processQueueBatch(Campaign $campaign): RedirectResponse
    {
        $queuedLogs = CampaignLog::where('campaign_id', $campaign->id)
            ->where('status', 'queued')
            ->limit(50)
            ->pluck('id')
            ->toArray();

        if (empty($queuedLogs)) {
            return back()->with('info', 'No queued emails waiting for this campaign.');
        }

        // Execute batch of 50 emails directly
        SendCampaignBatchJob::dispatchSync($campaign->id, $queuedLogs);

        return back()->with('success', 'Processed batch of 50 queued emails successfully!');
    }

    public function retryFailed(Campaign $campaign): RedirectResponse
    {
        $failedLogs = CampaignLog::where('campaign_id', $campaign->id)
            ->where('status', 'failed')
            ->get();

        if ($failedLogs->isEmpty()) {
            return back()->with('info', 'No failed delivery logs found to retry.');
        }

        $logIds = [];
        foreach ($failedLogs as $log) {
            $log->update([
                'status' => 'queued',
                'user_agent' => null,
            ]);
            $logIds[] = $log->id;
        }

        $campaign->update(['status' => 'sending']);

        $batchSize = 50;
        $chunks = array_chunk($logIds, $batchSize);

        foreach ($chunks as $index => $chunkLogIds) {
            if ($index === 0) {
                SendCampaignBatchJob::dispatchSync($campaign->id, $chunkLogIds);
            } else {
                SendCampaignBatchJob::dispatch($campaign->id, $chunkLogIds);
            }
        }

        return back()->with('success', 'Retrying delivery for '.count($logIds).' failed recipient(s)!');
    }

    public function cancelSchedule(Campaign $campaign, Request $request): RedirectResponse
    {
        if ($campaign->status !== 'scheduled') {
            return back()->with('error', 'Only scheduled campaigns can be cancelled.');
        }

        $campaign->update(['status' => 'cancelled']);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'campaign.cancelled',
            'description' => "Cancelled scheduled campaign '{$campaign->title}'",
            'properties' => ['campaign_id' => $campaign->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Campaign schedule cancelled.');
    }

    public function destroy(Campaign $campaign, Request $request): RedirectResponse
    {
        $title = $campaign->title;
        $campaign->delete();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'campaign.deleted',
            'description' => "Deleted campaign '{$title}'",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Campaign deleted successfully.');
    }

    protected function dispatchCampaign(Campaign $campaign)
    {
        $query = Subscriber::where('status', 'active');

        if ($campaign->target_type === 'group' && $campaign->subscriber_group_id) {
            $query->whereHas('groups', function ($q) use ($campaign) {
                $q->where('subscriber_groups.id', $campaign->subscriber_group_id);
            });
        }

        $subscribers = $query->get();

        if ($subscribers->isEmpty()) {
            $campaign->update([
                'status' => 'sent',
                'sent_at' => now(),
                'total_subscribers' => 0,
                'sent_count' => 0,
            ]);

            return;
        }

        $campaign->update([
            'status' => 'sending',
            'total_subscribers' => $subscribers->count(),
        ]);

        $createdLogIds = [];

        foreach ($subscribers as $subscriber) {
            $log = CampaignLog::firstOrCreate(
                [
                    'campaign_id' => $campaign->id,
                    'subscriber_id' => $subscriber->id,
                ],
                [
                    'tracking_token' => Str::random(40),
                    'status' => 'queued',
                ]
            );

            if (! $log->tracking_token) {
                $log->update(['tracking_token' => Str::random(40)]);
            }

            if ($log->status === 'queued') {
                $createdLogIds[] = $log->id;
            }
        }

        $batchSize = 50;
        $chunks = array_chunk($createdLogIds, $batchSize);

        // Process the first batch synchronously to start delivery immediately, and queue the rest!
        foreach ($chunks as $index => $chunkLogIds) {
            if ($index === 0) {
                SendCampaignBatchJob::dispatchSync($campaign->id, $chunkLogIds);
            } else {
                SendCampaignBatchJob::dispatch($campaign->id, $chunkLogIds);
            }
        }

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'campaign.queued',
            'description' => "Dispatched campaign '{$campaign->title}' for {$subscribers->count()} active subscribers in batches of {$batchSize}.",
            'properties' => [
                'campaign_id' => $campaign->id,
                'recipients' => $subscribers->count(),
                'batch_count' => count($chunks),
                'batch_size' => $batchSize,
            ],
        ]);
    }

    /**
     * Normalize localhost or relative media URLs in campaign content.
     */
    public static function normalizeMediaUrls(?string $content): string
    {
        if (empty($content)) {
            return '';
        }

        // Replace any localhost or 127.0.0.1:port /storage/ with root-relative /storage/
        $content = preg_replace(
            '#https?://(?:127\.0\.0\.1|localhost)(?::\d+)?/storage/#i',
            '/storage/',
            $content
        );

        return $content;
    }

    public function duplicate(Campaign $campaign, Request $request): RedirectResponse
    {
        $baseTitle = $campaign->title.' (Copy)';
        $title = $baseTitle;
        $counter = 1;
        while (Campaign::where('title', $title)->exists()) {
            $counter++;
            $title = "{$campaign->title} (Copy {$counter})";
        }

        $newCampaign = Campaign::create([
            'title' => $title,
            'subject' => $campaign->subject,
            'sender_name' => $campaign->sender_name,
            'sender_email' => $campaign->sender_email,
            'content_html' => $campaign->content_html,
            'template_id' => $campaign->template_id,
            'target_type' => $campaign->target_type,
            'subscriber_group_id' => $campaign->subscriber_group_id,
            'status' => 'draft',
            'scheduled_at' => null,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'campaign.created',
            'description' => "Duplicated campaign '{$campaign->title}' into new draft '{$newCampaign->title}'",
            'properties' => ['campaign_id' => $newCampaign->id, 'source_campaign_id' => $campaign->id],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('campaigns.edit', $newCampaign->id)->with('success', 'Campaign duplicated! You can edit this copy now.');
    }

    public function saveAsTemplate(Campaign $campaign, Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:50',
        ]);

        $baseName = ! empty($validated['name']) ? trim($validated['name']) : ($campaign->title.' Template');
        $name = $baseName;
        $counter = 1;
        while (EmailTemplate::where('name', $name)->exists()) {
            $counter++;
            $name = "{$baseName} ({$counter})";
        }

        $template = EmailTemplate::create([
            'name' => $name,
            'subject_template' => $campaign->subject,
            'category' => $validated['category'] ?? 'newsletter',
            'template_type' => 'content',
            'content_html' => $campaign->content_html,
            'is_default' => false,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.created',
            'description' => "Saved campaign '{$campaign->title}' as template '{$template->name}'",
            'properties' => ['template_id' => $template->id, 'campaign_id' => $campaign->id],
            'ip_address' => $request->ip(),
        ]);

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => "Campaign content saved as template '{$template->name}'!",
                'template' => $template,
            ]);
        }

        return redirect()->route('templates.index')->with('success', "Campaign content saved as template '{$template->name}'!");
    }
}
