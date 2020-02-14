<?php
//error_reporting(0);
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');

$message = $_GET['message'] ?? 'report';

$output = shell_exec ('python3 ./sendReceiveSerial.py "' . $message . '"');

$matches = [];

preg_match_all('/\<(.*?)\>/s', $output, $matches);

$result = '[' . implode(',', $matches[1]) . ']';

echo str_replace("'", '"', $result);
