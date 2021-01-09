<?php

// need a better solution than hard coding this
if ($_SERVER['PHP_SELF'] === '/var/www/thx1138-dev/html/ip/ip.php') {
  $configs = json_decode(file_get_contents('/var/www/thx1138-dev/html/config.json'), true);
} else {
  $configs = json_decode(file_get_contents('/var/www/html/config.json'), true);
}

$webRoute = $config['web_route'] ?? '/var/www/html';
$lastUpdateFile = $webRoute . '/ip/lastUpdate.txt';
$myIPFile = $webRoute . '/ip/myIP.txt';

$timeString = date('Y/m/d H:i:s', time());

$newIP = file_get_contents("http://ipecho.net/plain");
if (strlen($newIP) > 20) {
  $newIP = false;
}

// get the args that the script was called with
$arg = (isset($argc) && isset($argv[1])) ? $argv[1] : '';

$ipData = json_decode(file_get_contents($myIPFile), true);
if (! $ipData) {
  $ipData = [
    'ip' => '-',
    'failed_attempts' => 0
  ];
}
$oldIP = $ipData['ip'];

$wifiMode = file_get_contents($webRoute . '/ip/mode.txt');


// ap mode processes
if (stripos( $wifiMode, 'ap') !== false) {
  $time = new DateTimeImmutable('NOW');
  // between 3 and 5 past we shut down and attempt wifi mode
  // it will take more than 5 minutes to switch from wifi back to ap if we do not detect an ip
  if ((int)$time->format('H') === 3 && (int)$time->format('i') < 5) {
    file_put_contents($lastUpdateFile, $timeString . " | arg: $arg - switch to wifi mode \n",
      FILE_APPEND);

    shell_exec($webRoute . '/ip/wifi.sh');
    // this should have automatically exited;
    exit();
  }
  file_put_contents($lastUpdateFile, $timeString . " | arg: $arg - ap mode \n", FILE_APPEND);
  // no point in continuing if we are an access point
  exit();
}


// wifi mode processes
if (! $newIP) {
    $ipData['failed_attempts'] += 1;
    file_put_contents($lastUpdateFile, $timeString . " | arg: $arg - no ip \n", FILE_APPEND);
} else {

  $ipData['failed_attempts'] = 0;
  $ipData['ip'] = $newIP;

  if ($oldIP !== $newIP) {
    echo file_get_contents($config['remoteAddress'] . "?new-ip=$newIP");
    file_put_contents($lastUpdateFile, $timeString . " | arg  $arg - newIP: $newIP \n", FILE_APPEND);
  } else {
    file_put_contents($lastUpdateFile, $timeString . " | arg: $arg - no change \n", FILE_APPEND);
  }
}

// if we have 5 failed attempts in a row (5 minutes) then switch to access point mode
if ($ipData['failed_attempts'] > 5 && stripos( $wifiMode, 'wifi') !== false) {
  $ipData['failed_attempts'] = 0;
  file_put_contents($myIPFile, json_encode($ipData));
  file_put_contents($lastUpdateFile, $timeString . " | arg: $arg - switch to ap mode \n", FILE_APPEND);
  shell_exec($webRoute . '/ip/ap.sh');
  exit(); // unnecessary as the above command will reboot the computer
}

file_put_contents($myIPFile, json_encode($ipData));
