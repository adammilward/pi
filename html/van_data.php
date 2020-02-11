<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: http://localhost:3000");

$message = $_POST['message'] ?? 'report';
$status = '';

$command = './sendReceiveSerial.py ' . $message;
$output = exec($command, $status);

echo $output;

echo $output;
$matches = [];

preg_match_all('/\<(.*?)\>/s', $output, $matches);

$result = '[' . implode(',', $matches[1]) . ']';

$all=json_decode(str_replace("'", '"', $result), true);

echo $all;
