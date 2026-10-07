<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

$email = 'madara@loopsintegrated.com';

// Ensure subscriber exists and active
$subscriber = Subscriber::firstOrCreate(
    ['email' => $email],
    [
        'first_name' => 'Madara',
        'last_name' => 'Loops',
        'status' => 'active',
        'verified_at' => now(),
        'consent_ip' => '127.0.0.1',
        'consent_source' => 'Admin Test',
        'consent_timestamp' => now(),
    ]
);

$subscriber->update(['status' => 'active', 'verified_at' => now()]);

$groups = SubscriberGroup::all();
foreach ($groups as $group) {
    if (! $subscriber->groups->contains($group->id)) {
        $subscriber->groups()->attach($group->id);
    }
}

// Fetch latest campaign or create a test campaign
$campaign = Campaign::latest()->first();

if (! $campaign) {
    $campaign = Campaign::create([
        'title' => 'Test Campaign Email',
        'subject' => '⚡ Test Email from Email Marketing Hub',
        'sender_name' => 'Loops Team',
        'sender_email' => 'aspect@loops.lk',
        'content_html' => '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a;">SMTP Test Campaign Email</h2>
            <p style="color: #475569;">Hello {{first_name}},</p>
            <p style="color: #475569;">This is a test campaign email sent to <strong>{{email}}</strong> via your SMTP configuration (rs3-va.serverhostgroup.com).</p>
            <p style="text-align: center; margin: 28px 0;">
                <a href="http://127.0.0.1:8090/dashboard" style="background: #3b82f6; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Newsletter Dashboard</a>
            </p>
        </div>',
        'target_type' => 'all',
        'status' => 'sent',
    ]);
}

try {
    echo "Sending campaign '{$campaign->title}' to {$subscriber->email}...\n";
    Mail::to($subscriber->email)->send(
        new NewsletterMailable($campaign, $subscriber, Str::random(40))
    );
    echo "SUCCESS: Test email sent to {$subscriber->email} via SMTP!\n";
} catch (Throwable $e) {
    echo 'FAILED: '.$e->getMessage()."\n";
}
