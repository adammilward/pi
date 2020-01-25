<?php

require_once ('serial/PhpSerial.php');

$open = fopen('/dev/ttyACM0', 'w+');

$serial = new PhpSerial();

//this is the port where my Arduino is. Check from the Arduino IDE to see yours!
$serial->deviceSet("/dev/ttyACM0");
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

$serial->sendMessage('1');
echo $serial->readPort(100);

echo "DONE\n";
