<?php

function generateFile($name, $data) {
   //header('Content-Type: plain/text');
   header('Content-Type: application/force-download');
   header('Content-Disposition: attachment; filename="' . urlencode($name) . '";');
   header('Content-Transfer-Encoding: binary');
   header('Accept-Ranges: bytes');
   header('Cache-Control: must-revalidate');
   header('Content-Length: ' . strlen($data));
   echo $data;
}

if(isset($_POST['name']) && isset($_POST['data'])) {
   generateFile($_POST['name'], $_POST['data']);
} else if(isset($_GET['name']) && isset($_GET['data'])) {
   generateFile($_GET['name'], $_GET['data']);
} else {
   header('HTTP/1.0 404 Not Found');
}
