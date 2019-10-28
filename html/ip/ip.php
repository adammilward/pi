<?php

$newIP = file_get_contents("http://ipecho.net/plain");
echo $newIP . '<br>';

$oldIP = file_get_contents("myip.txt");
echo $oldIP;

if ($oldIP !== $newIP) {
    file_put_contents('myip.txt', $newIP);
    echo file_get_contents("https://adammilward.co.uk/thepi.php?new-ip=$newIP");
    file_put_contents('lastUpdate.txt', time() . ' - ' . $newIP . "\n", FILE_APPEND);
} else {
  file_put_contents('lastUpdate.txt', time() . ' - ' . getcwd() . "\n", FILE_APPEND);
}