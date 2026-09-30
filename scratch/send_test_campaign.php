<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Campaign;
use App\Models\Subscriber;
use App\Mail\NewsletterMailable;

$subscriber = Subscriber::where('email', 'aspect@loops.lk')->first();
$campaign = Campaign::find(7); // Or latest campaign

if ($subscriber && $campaign) {
    try {
        echo "Sending campaign '{$campaign->title}' to {$subscriber->email}...\n";
        \Illuminate\Support\Facades\Mail::to($subscriber->email)->send(
            new NewsletterMailable($campaign, $subscriber, \Illuminate\Support\Str::random(40))
        );
        echo "SUCCESS: Campaign email sent directly to {$subscriber->email} via SMTP!\n";
    } catch (\Throwable $e) {
        echo "FAILED: " . $e->getMessage() . "\n";
    }
}
