<?php
/**
 * Created by PhpStorm.
 * User: adam
 * Date: 22/01/2020
 */
header("Access-Control-Allow-Origin: http://localhost:3000");

phpinfo();
for ($i =1; $i < 10; $i++) {
  echo json_encode(['ooo']);
}
