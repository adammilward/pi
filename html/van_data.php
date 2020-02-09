<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: http://localhost:3000");

require_once ('serial/PhpSerial.php');
require_once('./config.php');

$serial = new PhpSerial();

$serial->deviceSet($config['port']);
$serial->confBaudRate(57600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");

$serial->deviceOpen();

$message = $_POST['message'] ?? 'lights report' ;
sleep(2); // todo delete for pi
if ($message) {
  $serial->sendMessage($message, 0.00001);
  // perhaps we need to send single letters if we are sending output?
  //foreach (str_split($message) as $letter) {
  //$serial->sendMessage($letter, 0.002);
  //}
  $serial->sendMessage("\r", 0.002);
}
usleep (200000);
$output = '';
while ($newOutput = $serial->readPort()) {
  $output .= $newOutput;
  //usleep(100);
}
echo $output;
$matches = [];

preg_match_all('/\<(.*?)\>/s', $output, $matches);

echo '<pre>';
//print_r ($matches);



$result = '[' . implode(',', $matches[1]) . ']';

$all=json_decode(str_replace("'", '"', $result), true);

print_r($all);

$individual = '';
foreach ($matches[1] as $match) {
  //echo $match, "\n-\n";
  $wank = $match;
  $individual = json_decode(str_replace("'", '"', $wank), true);
  print_r($individual);
}








