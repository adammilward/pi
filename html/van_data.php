<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');

$message = $_GET['message'] ?? 'report';

$output = shell_exec ('python3 ./sendReceiveSerial.py "' . $message . '"');

$matches = [];

preg_match_all('/\<(.*?)\>/s', $output, $matches);


$remainder = $output;
foreach ($matches[1] as $match) {
  $remainder = str_replace($match, '', $remainder);
}
$matches[1][] = "{'info': '<$remainder>'}";

$result = '[' . implode(',', $matches[1]) . ']';

// the output from arduino contains single quotes
echo str_replace("'", '"', $result);
