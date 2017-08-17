<?php
include ('cnx/cnx.php');

function GetBetween($var1="",$var2="",$pool){
$temp1 = strpos($pool,$var1)+strlen($var1);
$result = substr($pool,$temp1,strlen($pool));
$dd=strpos($result,$var2);
if($dd == 0){
$dd = strlen($result);
}

return substr($result,0,$dd);
}

if($_POST['region']!=""){
$comuna = $_POST['comuna']!="" ? " and descripcio LIKE '".$_POST['comuna']."%'" : "" ;
$qry	= "SELECT OBJECTID ids, descripcio, geom_txt,(select count(*) as cuenta from carga_infoemx_sal_dir where sector=descripcio and direccion_asignacion=1) cuenta FROM TABSECTORES WHERE region='{$_POST['region']}'{$comuna} ORDER BY descripcio";
$rs		= $mysqli->query($qry);
?>

<thead>
	<tr style="cursor: pointer">
		<th><span id="sectorCheck">Sectores</span> 
		<button type="button" title="crear nuevo polígono" class="btn btn-xs" style="color: blue; display: none" id="new"><i class="fa fa-plus"></i></button>
		<div class="btn-group" role="group" aria-label="...">
			<button type="button" title="grabar polígono" class="btn btn-xs" style="color: green; display: none" id="nsave"><i class="fa fa-floppy-o"></i></button>
			<button type="button" title="cancelar polígono" class="btn btn-xs" style="display: none" id="ncancel"><i class="fa fa-ban"></i></button>
		</div>
		
	</th>
	</tr>	
</thead>
<tbody>
<?php while($row = $rs->fetch_object()){?>
<?php $tmp = explode(", ",GetBetween("POLYGON ((","))",$row->geom_txt));
	foreach($tmp as $k=>$v){
		$tmp2 = explode(" ",$v);
		$final[] = "{lat:".$tmp2[1].",lng:".$tmp2[0]."}";
	}
	?>
	<tr>

		<td data-coord="[<?= implode(",",$final);?>]" data-sector="<?= $row->descripcio;?>" class="sector"><?= "(".str_pad($row->cuenta,3,"0",STR_PAD_LEFT).") ".$row->descripcio;?></td>
	</tr>
<?php unset($final);}?>
</tbody>
<?php }?>
