<?php

require_once ('serial/PhpSerial.php');
require_once('./config.php');

?>
<form action="" method="post">
    <label for="message">Message</label>
  <input id="message" type="text" name="message" value="<?php echo $_POST['message'] ?? '' ; ?>">
    <button type="submit" value="submit">Send</button>
</form>
<?php


$serial = new PhpSerial();

//this is the port where my Arduino is. Check from the Arduino IDE to see yours!
$c = 0;
//while (! $serial->deviceSet("/dev/ttyACM" . $c++) && $c < 5)
$serial->deviceSet($config['port']);
$serial->confBaudRate(57600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");

$serial->deviceOpen();


echo "<pre>";
$tStart = microtime(1);


echo "\n reading message \n";
echo htmlentities($serial->readPort() . "\n");

echo "\n Writting message \n";
$message = $_POST['message'] ?? '' ;
echo "$message \n";
if ($message) {
$serial->sendMessage($message, 0.00001);
  // perhaps we need to send single letters if we are sending output?
  //foreach (str_split($message) as $letter) {
    //$serial->sendMessage($letter, 0.002);
  //}
  $serial->sendMessage("\r", 0.002);
}
usleep (200000);
echo "\n reading message \n";
while ($output = $serial->readPort()) {
	echo $output;
	//usleep(100);
}





echo "\nDONE\n";
echo "</ pre>";

