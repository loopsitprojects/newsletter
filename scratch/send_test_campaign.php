<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\Subscriber;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

$subscriber = Subscriber::where('email', 'aspect@loops.lk')->first();
$campaign = Campaign::find(7); // Or latest campaign

if ($subscriber && $campaign) {
    try {
        echo "Sending campaign '{$campaign->title}' to {$subscriber->email}...\n";
        Mail::to($subscriber->email)->send(
            new NewsletterMailable($campaign, $subscriber, Str::random(40))
        );
        echo "SUCCESS: Campaign email sent directly to {$subscriber->email} via SMTP!\n";
    } catch (Throwable $e) {
        echo 'FAILED: '.$e->getMessage()."\n";
    }
}
