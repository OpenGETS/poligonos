<?php
include ('cnx/cnx.php');

$qryComunas	= "CALL sp_lis_nsec_by_reg('{$_POST['id']}')";
$rsComunas		= $mysqli->query($qryComunas);
?>
<option value="">seleccione comuna</option>
<?php while($row = $rsComunas->fetch_object()){?>
<option value="<?= $row->comuna;?>"><?= $row->comuna;?></option>
<?php }?>
