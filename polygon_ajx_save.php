<?php
include ('cnx/cnx.php');

if($_POST['save']==1){
	$qry	= "CALL sp_polygon_create('{$_POST['cod']}','{$_POST['coord']}','{$_POST['region']}')";
	if($mysqli->query($qry)){
		echo 1;
	}else{
		echo $mysqli->error;
	}
}else{
	echo "Error. NO AUTORIZADO!";
}
?>
