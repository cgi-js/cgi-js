<?php
// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//        CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com>  

header('Content-Type: application/json');
header('Content-Type: text/html; charset=utf-8');
echo json_encode(array('$_SERVER' => $_SERVER));

?>

