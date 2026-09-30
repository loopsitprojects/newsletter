<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Attempting to send test email via SMTP...\n";
    \Illuminate\Support\Facades\Mail::raw('This is a test email to verify SMTP configuration.', function ($message) {
        $message->to('aspect@loops.lk')
                ->subject('SMTP Verification Test');
    });
    echo "SUCCESS: Email sent via SMTP server!\n";
} catch (\Throwable $e) {
    echo "SMTP ERROR: " . $e->getMessage() . "\n";
    echo "TRACE:\n" . $e->getTraceAsString() . "\n";
}
