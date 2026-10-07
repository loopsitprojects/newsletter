<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Models\Campaign;
use App\Models\CampaignLog;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;

echo "=== LATEST CAMPAIGN INSPECTION ===\n";

$latestCampaign = Campaign::latest()->first();

if (! $latestCampaign) {
    echo "No campaigns found!\n";
    exit(0);
}

echo "ID: {$latestCampaign->id}\n";
echo "Title: {$latestCampaign->title}\n";
echo "Subject: {$latestCampaign->subject}\n";
echo "Status: {$latestCampaign->status}\n";
echo "Total Subscribers: {$latestCampaign->total_subscribers}\n";
echo "Sent Count: {$latestCampaign->sent_count}\n";
echo "Created At: {$latestCampaign->created_at}\n";
echo "---------------------------------\n";

echo "=== CAMPAIGN LOGS FOR THIS CAMPAIGN ===\n";
$logs = CampaignLog::with('subscriber')->where('campaign_id', $latestCampaign->id)->get();
foreach ($logs as $log) {
    echo "Log #{$log->id} | SubID: {$log->subscriber_id} | Email: {$log->subscriber?->email} | Status: {$log->status} | SentAt: {$log->sent_at}\n";
}

echo "---------------------------------\n";
echo "=== JOBS IN QUEUE ===\n";
$jobsCount = DB::table('jobs')->count();
echo "Jobs pending in queue: {$jobsCount}\n";
$jobs = DB::table('jobs')->get();
foreach ($jobs as $job) {
    echo "Job ID: {$job->id} | Queue: {$job->queue} | Payload: ".substr($job->payload, 0, 100)."...\n";
}

echo "---------------------------------\n";
echo "=== FAILED JOBS ===\n";
$failedJobsCount = DB::table('failed_jobs')->count();
echo "Failed jobs count: {$failedJobsCount}\n";
$failedJobs = DB::table('failed_jobs')->get();
foreach ($failedJobs as $fj) {
    echo "Failed Job ID: {$fj->id} | Exception: ".substr($fj->exception, 0, 200)."...\n";
}
