<?php
/**
 * Created by PhpStorm.
 * User: adam
 * Date: 16/12/2020
 */

$configs = json_decode(file_get_contents('..//config.json'), true);
header("Access-Control-Allow-Origin: *");
echo "<pre>";
print_r($configs);

echo "REMOTE_ADDR: {$_SERVER['REMOTE_ADDR']}\n";
echo "server_ADDR: {$_SERVER['SERVER_ADDR']}\n";
$startServerCommand = $configs['server.py'] . " " . $_SERVER['REMOTE_ADDR'];
$checkServerCommand = $configs['checkServer.py'] . " " . $_SERVER['SERVER_ADDR'];

$checkResponse = startServer($checkServerCommand, $startServerCommand);

error_log('socket check finished');
error_log($checkResponse);
echo 'socket check finished' . "\n";
echo $checkResponse . "\n";
echo "</pre>";

/**
 * @param mixed $checkServerCommand
 * @param mixed $startServerCommand
 * @return false|string|null
 */
function startServer(string $checkServerCommand, string $startServerCommand)
{
  echo "attempting to contact checkServer.py \n";
  $checkResponse = shell_exec($checkServerCommand);

  if (strpos($checkResponse, 'socket running') === false) {
    $startResponse = shell_exec($startServerCommand);
    error_log('socket check failed for hostname');
    error_log($checkResponse);
    echo 'socket check failed' . "\n";
    echo $checkResponse . "\n";
    $checkResponse = shell_exec($checkServerCommand);
  }
  return $checkResponse;
}