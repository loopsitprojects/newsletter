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

echo "=== DISPATCHING REAL CAMPAIGN TEST ===\n";

$campaign = Campaign::create([
    'title' => 'Live Test Campaign #'.time(),
    'subject' => '🔥 Live Campaign Test Delivery '.date('H:i:s'),
    'sender_name' => 'Loops Team',
    'sender_email' => 'aspect@loops.lk',
    'content_html' => '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #3b82f6; border-radius: 8px;">
        <h2 style="color: #1e3a8a;">Live Newsletter Test</h2>
        <p style="color: #334155;">Hello {{first_name}},</p>
        <p style="color: #334155;">This email was dispatched from the campaign editor using <strong>aspect@loops.lk</strong> via SMTP (rs3-va.serverhostgroup.com:465).</p>
        <p><a href="{{unsubscribe_url}}" style="color: #2563eb;">Unsubscribe</a></p>
    </div>',
    'target_type' => 'all',
    'status' => 'sent',
    'scheduled_at' => null,
    'sent_at' => now(),
]);

$recipients = ['madara@loopsintegrated.com', 'aspect@loops.lk'];

foreach ($recipients as $email) {
    $sub = Subscriber::where('email', $email)->first();
    if ($sub) {
        try {
            echo "Sending to {$email}...\n";
            Mail::to($email)->send(
                new NewsletterMailable($campaign, $sub, Str::random(40))
            );
            echo "SUCCESS: Sent to {$email}!\n";
        } catch (Throwable $e) {
            echo "FAILED for {$email}: ".$e->getMessage()."\n";
        }
    }
}
