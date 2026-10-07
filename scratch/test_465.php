<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use Illuminate\Contracts\Console\Kernel;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Email;

$host = 'rs3-va.serverhostgroup.com';
$port = 465;
$username = 'aspect@loops.lk';
$password = 'vYZB~+7L*ap)j+$Z';
$to = 'madara@loopsintegrated.com';

echo "Testing Port 465 SSL sending to {$to}...\n";

try {
    $transport = new EsmtpTransport($host, $port, true); // true = SSL
    $transport->setUsername($username);
    $transport->setPassword($password);

    $mailer = new Mailer($transport);

    $email = (new Email)
        ->from($username)
        ->to($to)
        ->subject('Important: Test Campaign Email from Newsletter Hub')
        ->text('Hello, this is a test email sent via port 465 SSL to ensure delivery.')
        ->html('<h2>Hello Madara,</h2><p>This is a test email sent via <strong>Port 465 SSL</strong> from <code>aspect@loops.lk</code>.</p>');

    $mailer->send($email);
    echo "SUCCESS: Email sent via Port 465 SSL to {$to}!\n";
} catch (Throwable $e) {
    echo 'ERROR: '.$e->getMessage()."\n";
}
