<?php
/**
 * this file gos on a remote server, and is called from ip.php with the current ip address
 */
// do new ip stuff
if (isset($_GET['new-ip']) && strlen($_GET['new-ip']) > 8 && strlen($_GET['new-ip']) < 20) {
  if (checkIP($_GET['new-ip'])) {
    file_put_contents('piip.txt', $_GET['new-ip']);
  };
} else {
  // do the redirect
  $ip = file_get_contents('piip.txt');
  if (strlen($ip) > 8 && strlen($ip) < 20) {
    if (checkIP($ip)) {
      header("Location: http://$ip:3142");
    } else {
      echo 'ip failed check';
    }
  } else {
    echo 'suspicious ip lenght encountered ' . $ip . '<br>';
  }
}
exit();

function checkIP($ip)
{
  return true;
  $code = rand(10000, 1000000000);i
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "http://$ip:3142/ip/confirm.php?code=$code");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  $got = curl_exec($ch);
  curl_close($ch);

  $expected = md5($code . 'yeah bro!');
  if ($expected === $got) {
    return true;
  }
  return false;
}