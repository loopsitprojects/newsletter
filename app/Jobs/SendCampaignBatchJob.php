<?php

namespace App\Jobs;

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\CampaignLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendCampaignBatchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $campaignId;

    public array $logIds;

    /**
     * Create a new job instance.
     *
     * @param  array  $logIds  List of CampaignLog IDs (up to 50) to process in this batch
     */
    public function __construct(int $campaignId, array $logIds)
    {
        $this->campaignId = $campaignId;
        $this->logIds = $logIds;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $campaign = Campaign::find($this->campaignId);
        if (! $campaign || $campaign->status === 'cancelled') {
            return;
        }

        $logs = CampaignLog::with('subscriber')
            ->whereIn('id', $this->logIds)
            ->where('status', 'queued')
            ->get();

        $sentInThisBatch = 0;

        foreach ($logs as $log) {
            $subscriber = $log->subscriber;
            if (! $subscriber || $subscriber->status !== 'active') {
                $log->update(['status' => 'failed']);

                continue;
            }

            try {
                Mail::to($subscriber->email)->send(
                    new NewsletterMailable($campaign, $subscriber, $log->tracking_token)
                );

                $log->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                ]);

                $sentInThisBatch++;
            } catch (\Throwable $e) {
                Log::error("Failed to send campaign email to {$subscriber->email}: ".$e->getMessage());
                $log->update([
                    'status' => 'failed',
                    'user_agent' => mb_substr($e->getMessage(), 0, 500),
                ]);
            }
        }

        // Increment campaign sent count
        if ($sentInThisBatch > 0) {
            $campaign->increment('sent_count', $sentInThisBatch);
        }

        // Check if there are any remaining queued logs for this campaign
        $remainingQueued = CampaignLog::where('campaign_id', $this->campaignId)
            ->where('status', 'queued')
            ->count();

        if ($remainingQueued === 0) {
            $campaign->update([
                'status' => 'sent',
                'sent_at' => now(),
            ]);
        }
    }
}
