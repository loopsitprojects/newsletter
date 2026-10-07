<?php

echo "=== DNS & MX RECORD LOOKUP ===\n";

$domain1 = 'loopsintegrated.com';
$mx1 = dns_get_record($domain1, DNS_MX);
echo "MX Records for {$domain1}:\n";
print_r($mx1);

$domain2 = 'loops.lk';
$mx2 = dns_get_record($domain2, DNS_MX);
echo "MX Records for {$domain2}:\n";
print_r($mx2);

$spf1 = dns_get_record($domain1, DNS_TXT);
echo "TXT/SPF Records for {$domain1}:\n";
foreach ($spf1 as $r) {
    if (isset($r['txt']) && str_contains($r['txt'], 'v=spf1')) {
        echo ' - '.$r['txt']."\n";
    }
}

$spf2 = dns_get_record($domain2, DNS_TXT);
echo "TXT/SPF Records for {$domain2}:\n";
foreach ($spf2 as $r) {
    if (isset($r['txt']) && str_contains($r['txt'], 'v=spf1')) {
        echo ' - '.$r['txt']."\n";
    }
}
