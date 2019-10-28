<?php
echo " 1 ";
function checkIP($ip)
{
  echo ' checkIp ';
  $code = rand(10000, 1000000000);
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "http://$ip:3142/ip/confirm.php?code=$code");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  $got = curl_exec($ch);
  curl_close($ch);

  echo ' got: ' . $got . ' ';

  $expected = md5($code . 'yeah bro!');
  echo ' expected: ' . $expected . ' ';
  if ($expected === $got) {
    return true;
  }
  return false;
}
// do new ip stuff
if (isset($_GET['new-ip']) && strlen($_GET['new-ip']) > 8 && strlen($_GET['new-ip']) < 20) {
  if (checkIP($_GET['new-ip'])) {
    echo ' ip check pass ';
    file_put_contents('piip.txt', $_GET['new-ip']);
  } else {
    echo ' ip check fail ';
  };
} else {
  echo " recirecting ";
  // do the redirect
  $ip = file_get_contents('piip.txt');
  if (strlen($ip) > 8 && strlen($ip) < 20) {
    if (checkIP($ip)) {
      header("Location: http://$ip:3142");
    } else {
      echo 'ip failed check';
    }
  } else {
    echo 'suspicious ip length encountered ' . $ip . '<br>';
  }
}