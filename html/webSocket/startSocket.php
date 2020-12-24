<?php
/**
 * Created by PhpStorm.
 * User: adam
 * Date: 16/12/2020
 */

header("Access-Control-Allow-Origin: http://localhost");
exit(); //todo this is only here for testing
$response = shell_exec (
  '/var/www/thx1138-dev/html/webSocket/.venv-env/bin/python3.8 /var/www/thx1138-dev/html/webSocket/startSocket.py'
  );

if (strpos($response, 'socket running') === false) {
  shell_exec (
    '/var/www/thx1138-dev/html/webSocket/.venv-env/bin/python3.8 /var/www/thx1138-dev/html/webSocket/server.py'
  );
  echo $response . "\n";
  $response = shell_exec (
    '/var/www/thx1138-dev/html/webSocket/.venv-env/bin/python3.8 /var/www/thx1138-dev/html/webSocket/startSocket.py'
  );
  $response = shell_exec (
    '/var/www/thx1138-dev/html/webSocket/.venv-env/bin/python3.8 /var/www/thx1138-dev/html/webSocket/startSocket.py'
  );
}


error_log($response);
echo $response . "\n";

