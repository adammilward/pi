<?php
/**
 * Created by PhpStorm.
 * User: adam
 * Date: 16/12/2020
 */
$configs = json_decode(file_get_contents('/var/www/html/config.json'));
print_r($configs);
header("Access-Control-Allow-Origin: http://localhost:3000");

$response = shell_exec ($configs['checkServer.py']);

if (strpos($response, 'socket running') === false) {
  shell_exec ($configs['server.py']);
  error_log('socket check failed');
  error_log($response);
  echo 'socket check failed' . "\n";
  echo $response . "\n";
  $response = shell_exec ($configs['checkServer.py']);
}

error_log('socket check finished');
error_log($response);
echo 'socket check finished' . "\n";
echo $response . "\n";

