<?php

use App\Models\CampaignLog;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$logs = CampaignLog::with('subscriber')->where('campaign_id', 7)->get();
foreach ($logs as $l) {
    echo "Log ID: {$l->id} | Sub ID: {$l->subscriber_id} | Email: {$l->subscriber?->email} | Status: {$l->status} | SentAt: {$l->sent_at}\n";
}
