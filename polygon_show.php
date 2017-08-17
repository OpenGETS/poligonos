<?php
include ('cnx/cnx.php');

$qryRegiones	= "CALL sp_lis_region()";
$rsRegiones		= $mysqli->query($qryRegiones);
?>
<!doctype html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<title>Polígonos</title>
<link rel="stylesheet" href="css/bootstrap.min.css"/>
<link rel="stylesheet" href="css/font-awesome.min.css"/>
<link rel="stylesheet" href="css/jquery-ui.min.css"/>
<style>

td {
	cursor: pointer;
	}
td.highlighted {
	text-decoration: underline;
	font-weight: bold;
	}
.map-container {
	width: 100%;
	height: 100%;
	}
#logo {
	position: absolute;
	top: 1%;
	right: 1%;
	margin-left: -50px;
	width: 5%;
	z-index : 91;
	}
#map {
	width: 100%;
	height: 100%;top : 0;
	left : 0;
	position : absolute;
	z-index : 90;
	}
#nav {
	z-index: 100;
	position: absolute;
	margin: 50px 0px 0px 50px;
	background-color: #fff;
	border: 1px #000 Solid;
	padding: 5px;
	max-height:600px;
	max-width: 300px;
	overflow-y: auto;
	background: rgba(255, 255, 255, 0.5);
	}

    </style>
</head>

<body>
<div id="container">

<div id="nav">
<div class="form">
<div class="form-group">
<select id="region" name="region" class="form-control">
	<option value="">seleccione región</option>
	<?php while($row = $rsRegiones->fetch_object()){?>
	<option value="<?= $row->cod_reg;?>"><?= $row->nombre_reg;?></option>
	<?php }?>
</select>
	</div>
	<div class="form-group">
<select id="comuna" name="comuna" class="form-control">
</select>
	</div>
	<div class=" text-center form-group">
<div class="btn-group">
<input type="button" name="filtrar" id="filtrar" class="btn btn-default" value="filtrar" />
<input type="button" name="borrar" id="borrar" class="btn btn-default" value="restablecer" />
	</div>
	</div>
	</div>
	<div  class="form-group" style="display: none" id="buscar">
	<input type="text" id="search" placeholder="buscar" class="form-control"></input>
	</div>
	<table id="listado" name="listado" class="table table-hover">
	
	</table>
</div>

	<div class="map-container">
	<div id="map"></div><img id="logo" src="images/logo.png" />
	</div>
    

	</div>
</body>
</html>
   <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXZAkhoed5vw84omexG79lpSyNYXs7-6U&libraries=drawing&callback=initMap">
    </script>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/polygon_show.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/bootbox.min.js"></script>