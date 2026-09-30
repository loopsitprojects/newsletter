<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Campaign;
use App\Models\Subscriber;

$activeSubscribers = Subscriber::where('status', 'active')->get();
echo "Total Active Subscribers ready to receive emails: " . $activeSubscribers->count() . "\n";
foreach ($activeSubscribers as $s) {
    echo " - " . $s->email . "\n";
}
