<?php
ignore_user_abort(false);
header('Content-Type: image/jpeg');
header('Cache-Control: no-cache');

$kb_s=4;
$kb_s=(int)(1000000/$kb_s);
if($kb_s<0) $kb_s=0;

$fp=fopen('image.jpg', 'r');

while(!feof($fp)) {
  echo fread($fp, 1);
  usleep(400);
}
fclose($fp);



