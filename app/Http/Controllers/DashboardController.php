<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Campaign;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalSubscribers = Subscriber::count();
        $activeSubscribers = Subscriber::where('status', 'active')->count();
        $pendingSubscribers = Subscriber::where('status', 'pending')->count();
        $unsubscribedCount = Subscriber::where('status', 'unsubscribed')->count();

        $campaignsSent = Campaign::where('status', 'sent')->count();
        $totalSentEmails = Campaign::where('status', 'sent')->sum('sent_count');
        $totalOpens = Campaign::where('status', 'sent')->sum('open_count');
        $totalClicks = Campaign::where('status', 'sent')->sum('click_count');

        $avgOpenRate = $totalSentEmails > 0 ? round(($totalOpens / $totalSentEmails) * 100, 1) : 0;
        $avgClickRate = $totalSentEmails > 0 ? round(($totalClicks / $totalSentEmails) * 100, 1) : 0;

        $recentCampaigns = Campaign::with('group')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $recentSubscribers = Subscriber::with('groups')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        $recentLogs = ActivityLog::with('user')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // Chart Data: Growth over last 7 days / months
        $subscriberGrowth = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Subscriber::whereDate('created_at', '<=', $date)->count();
            $subscriberGrowth[] = [
                'date' => $date->format('M d'),
                'subscribers' => $count,
            ];
        }

        $groupStats = SubscriberGroup::withCount('subscribers')->get();

        return Inertia::render('Dashboard', [
            'metrics' => [
                'totalSubscribers' => $totalSubscribers,
                'activeSubscribers' => $activeSubscribers,
                'pendingSubscribers' => $pendingSubscribers,
                'unsubscribedCount' => $unsubscribedCount,
                'campaignsSent' => $campaignsSent,
                'totalSentEmails' => $totalSentEmails,
                'avgOpenRate' => $avgOpenRate,
                'avgClickRate' => $avgClickRate,
            ],
            'recentCampaigns' => $recentCampaigns,
            'recentSubscribers' => $recentSubscribers,
            'recentLogs' => $recentLogs,
            'subscriberGrowth' => $subscriberGrowth,
            'groupStats' => $groupStats,
        ]);
    }
}
