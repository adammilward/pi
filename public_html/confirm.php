<?php
if (isset($_GET['code'])) {
  echo md5($_GET['code'] . 'yeah bro!');
} else {
  echo 'na\'h way bro!';
}
