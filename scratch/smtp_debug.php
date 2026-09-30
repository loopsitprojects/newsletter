<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\EventListener\MessengerClearResultListener;

echo "=== DETAILED SMTP DIAGNOSTIC TEST ===\n";

$host = 'rs3-va.serverhostgroup.com';
$port = 587;
$username = 'aspect@loops.lk';
$password = 'vYZB~+7L*ap)j+$Z';
$to = 'madara@loopsintegrated.com';

echo "Host: {$host}:{$port}\n";
echo "Username: {$username}\n";
echo "Recipient: {$to}\n";
echo "-------------------------------------\n";

// Test 1: Socket Connection
$fp = @fsockopen($host, $port, $errno, $errstr, 10);
if (!$fp) {
    echo "ERROR: Cannot connect to {$host}:{$port} - ({$errno}) {$errstr}\n";
    exit(1);
} else {
    $welcome = fgets($fp, 512);
    echo "1. Server Welcome Response: " . trim($welcome) . "\n";
    fclose($fp);
}

// Test 2: Symfony Mailer with EsmtpTransport
try {
    $transport = new EsmtpTransport($host, $port, false);
    $transport->setUsername($username);
    $transport->setPassword($password);

    $mailer = new Mailer($transport);

    $email = (new Email())
        ->from($username)
        ->to($to)
        ->subject('Direct SMTP Diagnostic Test - ' . date('Y-m-d H:i:s'))
        ->text('This is a test email sent using direct Symfony EsmtpTransport to verify delivery to ' . $to)
        ->html('<p>This is a test email sent using direct Symfony EsmtpTransport to verify delivery to <strong>' . $to . '</strong></p>');

    echo "2. Sending email via Symfony EsmtpTransport...\n";
    $mailer->send($email);
    echo "3. SYMFONY MAILER SENT SUCCESSFULLY!\n";

} catch (\Throwable $e) {
    echo "ERROR IN MAILER: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}

// Test 3: Test port 465 (SSL) as alternative if 587 fails or bounces
echo "-------------------------------------\n";
echo "Testing port 465 SSL connection...\n";
$fpSSL = @fsockopen('ssl://' . $host, 465, $errno, $errstr, 10);
if ($fpSSL) {
    $welcomeSSL = fgets($fpSSL, 512);
    echo "Port 465 SSL Available! Response: " . trim($welcomeSSL) . "\n";
    fclose($fpSSL);
} else {
    echo "Port 465 SSL NOT Available or Timed Out.\n";
}
