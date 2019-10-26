<?php

$ip = file_get_contents('http://checkip.dyndns.com/');
echo $ip . '<br>';
echo str_replace('Current IP Address: ', '', $ip) . '<br>';

$ip = file_get_contents("http://ipecho.net/plain");
echo $ip . '<br>';

file_get_contents("http://localhost/thepi.php?new-ip=$ip");