<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Models\Subscriber;
use Illuminate\Contracts\Console\Kernel;

$activeSubscribers = Subscriber::where('status', 'active')->get();
echo 'Total Active Subscribers ready to receive emails: '.$activeSubscribers->count()."\n";
foreach ($activeSubscribers as $s) {
    echo ' - '.$s->email."\n";
}
