<?php
include ('cnx/cnx.php');

if($_POST['edit']==1){
	$qry	= "CALL sp_polygon_edit('{$_POST['cod']}','{$_POST['coord']}')";
	if($mysqli->query($qry)){
		echo 1;
	}else{
		echo $mysqli->error;
	}
}else{
	echo "Error. NO AUTORIZADO!";
}
?>
