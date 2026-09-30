<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Campaign;
use App\Models\EmailTemplate;
use App\Models\Subscriber;
use App\Mail\NewsletterMailable;

$template = EmailTemplate::where('name', 'Standard Master Newsletter Template')->first();

if (!$template) {
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
        \Illuminate\Support\Facades\Mail::to($sub->email)->send(
            new NewsletterMailable($campaign, $sub, \Illuminate\Support\Str::random(40))
        );
        echo "SUCCESS: Sent to {$sub->email}!\n";
    } catch (\Throwable $e) {
        echo "ERROR for {$sub->email}: " . $e->getMessage() . "\n";
    }
}
