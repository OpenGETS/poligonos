<?php
error_reporting(E_ERROR);
ini_set('display_errors',1);

$host	= "localhost";
//$dbase	= "sistemaweb05052017";
$dbase	= "normalizacion_beco_web";
$user	= "root";
$pass	= "";

try {
	$mysqli = new mysqli($host, $user, $pass, $dbase);
	} catch(Exception $e){
		echo $e->getMessage()."<br>".mysqli_connect_error();
	}

try {
	$mysqli->set_charset("utf8");
	} catch(Exception $e){
		echo $e->getMessage()."<br>"."Error cargando el conjunto de caracteres utf8: ".$mysqli->error;
	}