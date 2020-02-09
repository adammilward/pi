<?php

require_once ('serial/PhpSerial.php');

?>
<form action="" method="post">
  <input type="text" name="message"/>
</form>
<?php


$serial = new PhpSerial();

//this is the port where my Arduino is. Check from the Arduino IDE to see yours!
$c = 0;
//while (! $serial->deviceSet("/dev/ttyACM" . $c++) && $c < 5)
$serial->deviceSet("/dev/serial0");
$serial->confBaudRate(9600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");

$serial->deviceOpen();


echo "<pre>";
$tStart = microtime(1);
$s =  (isset($_GET['s'])) ? $_GET['s'] : 1000;
$s *= 1000;

echo htmlentities($serial->readPort() . "\n");

foreach (str_split($_post['message']) as $letter) {
  $serial->sendMessage($letter,  0.003);
}

echo htmlentities($serial->readPort() . "\n");

echo "\nDONE\n";
echo "</ pre>";

