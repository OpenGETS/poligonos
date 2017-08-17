<?php
include ('cnx/cnx.php');

if($_POST['del']==1){
	$qry	= "CALL sp_polygon_delete('{$_POST['cod']}')";
	if($mysqli->query($qry)){
		echo 1;
	}else{
		echo $mysqli->error;
	}
}else{
	echo "Error. NO AUTORIZADO!";
}
?>
