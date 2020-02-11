<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: http://localhost:3000");

$command = escapeshellcmd('./sendReceiveSerial.py');
$output = shell_exec($command);
echo $output;






