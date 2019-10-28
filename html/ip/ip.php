<?php

$lastUpdateFile = '/var/www/html/ip/lastUpdate.txt';
$myIPFile = '/var/www/html/ip/myIP.txt';


$newIP = file_get_contents("http://ipecho.net/plain");
echo $newIP . '<br>';

$oldIP = file_get_contents($myIPFile);
echo $oldIP;

if ($oldIP !== $newIP) {
    file_put_contents($myIPFile, $newIP);
    echo file_get_contents("https://adammilward.co.uk/thepi.php?new-ip=$newIP");
    file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . ' - ' . $newIP . "\n", FILE_APPEND);
} else {
  file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . ' - ' . getcwd() . "\n", FILE_APPEND);
}