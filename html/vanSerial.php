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
$serial->confBaudRate(9600);
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
if ($message) {
  foreach (str_split($message) as $letter) {
    echo "letter: ", $letter, "\n";
    $serial->sendMessage($letter, 0.0001);
echo	$serial->readPort(), "\n" ;
  }

  $serial->sendMessage("\r", 0.001);
}

echo "\n reading message \n";
echo htmlentities($serial->readPort() . "\n");

echo "\nDONE\n";
echo "</ pre>";

