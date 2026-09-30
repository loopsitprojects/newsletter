<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Subscriber;
use App\Models\SubscriberGroup;

$email = 'aspect@loops.lk';

$subscriber = Subscriber::firstOrCreate(
    ['email' => $email],
    [
        'first_name' => 'Aspect',
        'last_name' => 'Loops',
        'status' => 'active',
        'verified_at' => now(),
        'consent_ip' => '127.0.0.1',
        'consent_source' => 'Admin Test',
        'consent_timestamp' => now(),
    ]
);

$groups = SubscriberGroup::all();
foreach ($groups as $group) {
    if (!$subscriber->groups->contains($group->id)) {
        $subscriber->groups()->attach($group->id);
    }
}

echo "Subscriber {$email} (ID: {$subscriber->id}) added and attached to all " . count($groups) . " groups!\n";
