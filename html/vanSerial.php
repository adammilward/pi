<?php

require_once ('serial/PhpSerial.php');

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

// we will send the colors as csv strings
$colors['red']   = '255, 0, 0';
$colors['green'] = '0, 255, 0';
$colors['blue']  = '0, 0, 255';

/*foreach ($colors as $color => $value) {
echo "Now sending $color\n";
$serial->sendMessage($value . "\n");
sleep(1);
}*/

echo "<pre>";
$tStart = microtime(1);
$s =  (isset($_GET['s'])) ? $_GET['s'] : 1000;
$s *= 1000;

//usleep($s);
//$tStart = getTime($tStart, "sleep $s");
//usleep($s);
echo htmlentities($serial->readPort() . "\n");
//$tStart = getTime($tStart, 'read 1');

//usleep($s);
//$tStart = getTime($tStart, "sleep $s");
//$serial->sendMessage((string) 'hello');
foreach (str_split($_GET['msg']) as $letter) {
	//echo ($letter);
	$serial->sendMessage($letter,  0.003);
}
$serial->sendMessage("\n" . $_GET['msg'] . "\n", 2);
$serial->sendMessage("012345678901234567890\n");
//$serial->sendMessage((string) $_GET['msg'] . "     \n", 1);
//$tStart = getTime($tStart, 'write');

//usleep($s);
//$tStart = getTime($tStart, "sleep $s");

echo htmlentities($serial->readPort() . "\n");
//$tStart = getTime($tStart, 'read 2');


echo "\nDONE\n";
echo "</ pre>";

