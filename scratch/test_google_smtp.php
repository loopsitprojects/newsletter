<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;

$host = 'rs3-va.serverhostgroup.com';
$port = 465;
$username = 'aspect@loops.lk';
$password = 'vYZB~+7L*ap)j+$Z';

echo "=== TESTING DIRECT CONNECTION TO SERVERHOSTGROUP SMTP ===\n";

try {
    $transport = new EsmtpTransport($host, $port, true);
    $transport->setUsername($username);
    $transport->setPassword($password);

    $mailer = new Mailer($transport);

    $email = (new Email())
        ->from($username)
        ->to('madara@loopsintegrated.com')
        ->subject('Critical Test - SMTP Delivery Test ' . date('H:i:s'))
        ->text('Testing if Gmail/Google Workspace accepts mail sent from aspect@loops.lk via rs3-va.serverhostgroup.com');

    $mailer->send($email);
    echo "Serverhostgroup Exim SMTP returned OK (Message handed to queue)\n";
} catch (\Throwable $e) {
    echo "SMTP ERROR: " . $e->getMessage() . "\n";
}
