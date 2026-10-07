<?php

use App\Models\Campaign;
use App\Models\Subscriber;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

echo "--- SUBSCRIBERS --- \n";
$subscribers = Subscriber::all();
foreach ($subscribers as $s) {
    echo "ID: {$s->id} | Email: {$s->email} | Status: {$s->status} | Verified: {$s->verified_at}\n";
}

echo "\n--- CAMPAIGNS --- \n";
$campaigns = Campaign::latest()->get();
foreach ($campaigns as $c) {
    echo "ID: {$c->id} | Title: {$c->title} | Target: {$c->target_type} | GroupID: {$c->subscriber_group_id} | Status: {$c->status} | SentCount: {$c->sent_count}\n";
}
