<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$c = \App\Models\Campaign::find(10);
echo "Title: {$c->title}\n";
echo "Subject: {$c->subject}\n";
echo "Sender Name: {$c->sender_name}\n";
echo "Sender Email: {$c->sender_email}\n";
echo "HTML Length: " . strlen($c->content_html) . "\n";
echo "HTML Content Preview:\n" . substr($c->content_html, 0, 300) . "\n";
