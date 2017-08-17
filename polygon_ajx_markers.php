<?php
include ('cnx/cnx.php');

if($_POST['sector']!=""){

$qry	= "CALL sp_polygon_contains('{$_POST['sector']}');";
$rs		= $mysqli->query($qry);
	
while($row = $rs->fetch_object()){
	$res[]=$row;
}
echo json_encode($res);
$mysqli->close();
}