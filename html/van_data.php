<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: http://localhost:3000");

$message = $_POST['message'] ?? 'report';

$command = 'python3 ./sendReceiveSerial.py ' . $message;
$output = exec($command, $response, $return);

var_dump($response);

var_dump($return);

var_dump($output);

$matches = [];

preg_match_all('/\<(.*?)\>/s', $output, $matches);

$result = '[' . implode(',', $matches[1]) . ']';

$all = json_decode(str_replace("'", '"', $result), true);

var_dump($all);
