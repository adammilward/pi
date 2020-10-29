<?php

require_once '/var/www/html/config.php';

$webRoute = $config['web_route'] ?? '/var/www/html';
$lastUpdateFile = $webRoute . '/ip/lastUpdate.txt';
$myIPFile = $webRoute . '/ip/myIP.txt';

//$newIP = file_get_contents("http://ipecho.net/plain");
$newIP = false;
echo $newIP . '<br>';

$wifiMode = file_get_contents($webRoute . '/ip/mode.txt');
if (stripos( $wifiMode, 'ap') !== false) {
  $time = new DateTimeImmutable('NOW');
  // between 3 and 5 past we shut down and attempt wifi mode
  // it will take more than 5 minutes to switch from wifi back to ap if we do not detect an ip
  if ((int)$time->format('H') === 17 && (int)$time->format('i') < 15) {
    file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . " | arg: $arg - switch to wifi mode \n",
      FILE_APPEND);

    shell_exec($webRoute . '/ip/wifi.sh');
  }
  file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . " | arg: $arg - ap mode \n", FILE_APPEND);
  // no point in continuing if we are an access point
  exit();
}

$ipData = json_decode(file_get_contents($myIPFile), true);
if (! $ipData) {
  $ipData = [
    'ip' => '-',
    'failed_attempts' => 0
  ];
}
$oldIP = $ipData['ip'];

// get the args that the script was called with
$arg = (isset($argc) && isset($argv[1])) ? $argv[1] : '';


if (! $newIP) {
    $ipData['failed_attempts'] += 1;
    file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . " | arg: $arg - no ip \n", FILE_APPEND);
} else {

  $ipData['failed_attempts'] = 0;
  $ipData['ip'] = $newIP;

  if ($oldIP !== $newIP) {
    echo file_get_contents($config['remoteAddress'] . "?new-ip=$newIP");
    file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . " | arg  $arg - newIP: $newIP \n", FILE_APPEND);
  } else {
    file_put_contents($lastUpdateFile, date('Y/m/d h:i:s', time()) . " | arg: $arg - no change \n", FILE_APPEND);
  }
}

// if we have 5 failed attempts in a row (5 minutes) then switch to access point mode
if ($ipData['failed_attempts'] > 5 && stripos( $wifiMode, 'wifi') !== false) {
  $ipData['failed_attempts'] = 0;
  file_put_contents($myIPFile, json_encode($ipData));
  shell_exec($webRoute . '/ip/ap.sh');
  exit(); // unnecessary as the above command will reboot the computer
}

file_put_contents($myIPFile, json_encode($ipData));
