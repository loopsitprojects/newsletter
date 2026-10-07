<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\EmailTemplate;
use App\Models\Subscriber;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

$template = EmailTemplate::where('name', 'Standard Master Newsletter Template')->first();

if (! $template) {
    echo "Template not found!\n";
    exit(1);
}

$campaign = Campaign::create([
    'title' => 'Master Newsletter Template Showcase',
    'subject' => '✨ New Standard Newsletter Template Preview',
    'sender_name' => 'Loops Marketing',
    'sender_email' => 'aspect@loops.lk',
    'content_html' => $template->content_html,
    'template_id' => $template->id,
    'target_type' => 'all',
    'status' => 'sent',
    'scheduled_at' => null,
    'sent_at' => now(),
]);

$subscribers = Subscriber::whereIn('email', ['madara@loopsintegrated.com', 'aspect@loops.lk'])->get();

foreach ($subscribers as $sub) {
    try {
        echo "Sending Master Newsletter Template to {$sub->email}...\n";
        Mail::to($sub->email)->send(
            new NewsletterMailable($campaign, $sub, Str::random(40))
        );
        echo "SUCCESS: Sent to {$sub->email}!\n";
    } catch (Throwable $e) {
        echo "ERROR for {$sub->email}: ".$e->getMessage()."\n";
    }
}
