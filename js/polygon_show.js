// script poligonos
// v2 - 2017-07-14
// hecho por nexeon@gmail.com
/////////////////////////////
var undoPaths = [];
localStorage.clear();
var infoWindow2 = null;
var polygon = [];

$("#region").on("click", function(){
	$.ajax({
	  method: "POST",
	  url: "polygon_ajx_comunas.php",
	  data: { id: $(this).val() }
	})
	  .done(function( data ) {
		$("#comuna").html(data);
	  });
});
$("#filtrar").on("click", function(){
	
	$.ajax({
	  method: "POST",
	  url: "polygon_ajx_list.php",
	  data: { region: $("#region").val(), comuna: $("#comuna").val() }
	})
	  .done(function( data ) {
	
		$("#buscar").show();
		$("#listado").html(data);
		clearAll();
		todos();
	if($("#comuna").val()!=""){
		$("#new").removeAttr("disabled");
		$("#new").show();
		$("#nsave").hide();
		$("#ncancel").hide();
	}
	  });
});

$(document).on("click", "#sectorCheck", function(){
	todos();
});
function todos(n){
	$('.sector').trigger('click');
}
$("#borrar").on("click", function(){
	window.location.href='polygon_show.php';//clearAll();//
});
$("#search").on("keyup", function() {
	$(this).val($(this).val().toUpperCase());
    var value = $(this).val();

    $("table tr").each(function(index) {
        if (index !== 0) {

            $row = $(this);

            var id = $row.find("td:last").text();

            if (id.indexOf(value) !== 0) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
});
$(document).on("click", ".sector", function(){
	var c = $(this).attr("data-coord");
	var s = $(this).attr("data-sector");
	$(this).toggleClass('highlighted');
	$.ajax({
	  method: "POST",
	  url: "polygon_ajx_markers.php",
	  data: { sector: s }
	})
	  .done(function( data ) {
		temp = JSON.parse(data);
		addPolygon(eval(c),s);//agrega coordenadas como array
		var array = [];
		
		$.each(temp, function(i, item) {
			addMarker(item.id, item.lat, item.lng, item.rut, item.nombre, item.calle+ ' ' + item.numero, item.piso, item.depto, item.impacto, item.comuna, item.sector);
		});

	});
	$.ajax({
	  method: "POST",
	  url: "polygon_ajx_markers_99.php",
	  data: { sector: s }
	})
	  .done(function( data ) {
		temp = JSON.parse(data);
		$.each(temp, function(i, item) {
			addMarker(item.id, item.lat, item.lng, item.rut, item.nombre, item.calle+ ' ' + item.numero, item.piso, item.depto, item.impacto, item.comuna, item.sector);
			//console.log(item.rut+' '+item.nombre+' '+ item.calle+ ' ' + item.numero+' '+item.lat+' '+item.lng);
		});

	});
});

$(document).on("click", ".editar, .cancelar", function(){
	var s = $(this).attr("data-sector");
	toggleEdit(s);
});
var map; //global variable
var drawingManager;
var gpolygons	= []; //global variable
var gmarkers	= []; //global variable
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.438042, lng: -70.650432},
	zoom: 5,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true
  });
	//addDraw();
}

function addDraw(){
	drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: ['polygon']
	},
	polygonOptions: {
		strokeColor: '#000000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#ffff00',
		fillOpacity: 0.35,
		clickable: false,
		editable: true,
		zIndex: 92
    }
    
  });
	drawingManager.setMap(map);
	drawingManager.addListener('polygoncomplete', polygonData);
	
	
	
}
$(document).on("click", "#nsave", function(){
	savePolygon();
})
function savePolygon(){
	var s = $("#comuna").val();
	var r = $("#region").val();
	var constructCoord = [];
	var vertices = polygon.getPath();
		  
		for (var i =0; i < vertices.getLength(); i++) {// obtener coordenadas actuales
		  var xy = vertices.getAt(i);
			constructCoord.push(xy.lng() + ' ' + xy.lat());
		}
	  
	var ncoord = 'POLYGON ((' + constructCoord.join(', ') + '))';
	bootbox.confirm({
    title: "GRABA SECTOR "+s,
    message: '<strong>¿Seguro desea grabar el nuevo sector '+s+'?</strong>',
    buttons: {
        cancel: {
            label: '<i class="fa fa-times"></i> Cancel',
			className: 'btn-success'
        },
        confirm: {
            label: '<i class="fa fa-check"></i> Confirm',
			className: 'btn-danger'
        }
    },
    callback: function (result) {
		if(result===true){
			$.ajax({
			  method: "POST",
			  url: "polygon_ajx_save.php",
			  data: { cod: s, coord: ncoord, region: r, save: 1 }
			})
			  .done(function( data ) {
				if(data==1){
					polygon.setMap(null);
					$("#new").show();
					$("#nsave").hide();
					$("#ncancel").hide();
					$("#filtrar").removeAttr('disabled');
					$("#region").removeAttr('disabled');
					$("#comuna").removeAttr('disabled');
					$("#buscar").removeAttr('disabled');
					$("#filtrar").trigger("click");
				}else{
					bootbox.alert(data);
					
				}

			  });
		}
		}
	});
}
function polygonData(npolygon){
	polygon = npolygon;
	drawingManager.setDrawingMode(null);
		$("#new").hide();
		$("#nsave").show();
		$("#ncancel").show();
	$("#filtrar").attr('disabled','disabled');
	$("#region").attr('disabled','disabled');
	$("#comuna").attr('disabled','disabled');
	$("#buscar").attr('disabled','disabled');
//	var vertices = polygon.getPath();
//	for (var i =0; i < vertices.getLength(); i++) {// obtener coordenadas actuales
//	  var xy = vertices.getAt(i);
//	  console.log('<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' + xy.lng());
//	}
}
function cancelPolygon(){
	polygon.setMap(null);
}

function addMarker(id, lat, lng, rut, nombre, desc, piso, depto, impact, comuna, sector) {
	var icon_url = 'images/marker_yellow.png';
	var label_color =  "#000";
	switch(impact){
		case 'M': icon_url = 'images/marker_red.png'; label_color = "#fff"; break;
		case 'B': icon_url = 'images/marker_green.png'; label_color = "#fff"; break;
		case '99': icon_url = 'images/marker_black.png'; label_color = "#ccc"; break;

	}
	var existe=0;
	for (var i = 0; i < gmarkers.length; i++) {
		if (gmarkers[i]._uniqueId == id) {
		  existe = 1;
		}
	  }
	if(existe==0){
		var infoWindow = new google.maps.InfoWindow();
		var location = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({
			title: rut+' '+nombre,
			position: location,
			icon: icon_url,
			label: {
				text: String(' '),
				color: label_color,
				fontSize: '10px'
			},
			map: map,
			_uniqueId: id
		});

		(function (marker) {
			google.maps.event.addListener(marker, "click", function (e) {
				vpiso = piso || '' ;
				vdepto = depto || '' ;
				//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
				infoWindow.setContent("<div style = 'width:300px;min-height:40px'><strong>RUT: </strong> " + rut + "<br><strong>Nombre: </strong> " + nombre + "<br><strong>Calle:</strong> " + desc + "<br><strong>Piso:</strong> " + vpiso + "<br><strong>Depto:</strong> " + vdepto + "<br><strong>Comuna:</strong> " + comuna + "<br><strong>Sector:</strong> " + sector + "</div>");
				if(!marker.open){
					infoWindow.open(map,marker);
					marker.open = true;
				}
				else{
					infoWindow.close();
					marker.open = false;
				}
			});
			google.maps.event.addListener(map, 'click', function() {
				infoWindow.close();
				marker.open = false;
			});
		})(marker);
		gmarkers.push(marker);
	}else{
		toggleMarker(id);
	}
}

function togglePolygon(id) {
  for (var i = 0; i < gpolygons.length; i++) {
    if (gpolygons[i]._uniqueId == id) {
      if (gpolygons[i].getMap() != null) {
        gpolygons[i].setMap(null);
      } else {
        gpolygons[i].setMap(map);
      }
    }
  }
}

function toggleMarker(id) {
  for (var i = 0; i < gmarkers.length; i++) {
    if (gmarkers[i]._uniqueId == id) {
      if (gmarkers[i].getMap() != null) {
        gmarkers[i].setMap(null);
      } else {
        gmarkers[i].setMap(map);
      }
    }
  }
}
function toggleEdit(id){
	var thisKey = 0;
	var existant = 0;
	for (var i = 0; i < gpolygons.length; i++) {
		if (gpolygons[i]._uniqueId == id) {
			thisKey = i;
		}
		if (gpolygons[i].getEditable() && gpolygons[i]._uniqueId != id) {
			existant = parseInt(existant) + 1;
		}
	}
	if(existant>0){
		alert("Ya está editando un sector distinto!");
	}else{
		if (!gpolygons[thisKey].getEditable()) {
			gpolygons[thisKey].setEditable(true);
			var vertices = gpolygons[thisKey].getPath();
			pathOfFirstPolygon = [];
            for (var i =0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                item = {};
                item["lat"] = xy.lat();
                item["lng"] = xy.lng();
                pathOfFirstPolygon.push(item);
            }
			savePrevPath(pathOfFirstPolygon);
			localStorage.setItem("id",id);
			$("#S_"+id).show();
			$("#C_"+id).show();
			$("#E_"+id).hide();
		} else {
			gpolygons[thisKey].setEditable(false);
			gpolygons[thisKey].setPath(undoPaths);
			undoPaths.length = 0;
			localStorage.clear();
			$("#S_"+id).hide();
			$("#C_"+id).hide();
			$("#E_"+id).show();
		}
	}
}
function clearAll(){
for (var i = 0; i < gpolygons.length; i++) {gpolygons[i].setMap(null);}
for (var i = 0; i < gmarkers.length; i++) {gmarkers[i].setMap(null);}
	gpolygons=[];
	gmarkers=[];
	$(".sector").removeClass("highlighted");
}

function addPolygon(ncoord, id){
	var existe=0;
	for (var i = 0; i < gpolygons.length; i++) {
		if (gpolygons[i]._uniqueId == id) {
		  existe = 1; existeId=i;
		}
	  }
	vlat = ncoord[0].lat;
	vlng = ncoord[0].lng;
	var center = new google.maps.LatLng(vlat, vlng);
	if(existe==0){
		var poly = new google.maps.Polygon({
		  paths: ncoord,
		  strokeColor: '#000000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#A3CCFF',
		  fillOpacity: 0.35,
			_uniqueId: id,
			content: id
			//editable: true,
			//draggable: true

		});
		poly.setMap(map);
		poly.addListener('click', showArrays);// para mostrar el sector al click
		poly.addListener('rightclick', showArraysb);
		gpolygons.push(poly);
		
		infoWindow = new google.maps.InfoWindow;// mostrando el sector
		infoWindow2 = new google.maps.InfoWindow;// mostrando el menu
		function showArrays(event) {
			var vertices = this.getPath();
			infoWindow.setContent(this.content);
			infoWindow.setPosition(event.latLng);
			infoWindow.open(map);
		  }
		function showArraysb(event) {
			var vertices = this.getPath();
			var contentString = "";//console.log(poly.content);
			if(localStorage.getItem("id")==poly.content){sta="display: none;";stb="";}else{sta="";stb="display: none;";}
			contentString = ''+
				'<div class="input-group" style="width: 250px" id="D_'+poly.content+'">'+
				'<span class="input-group-addon" id="basic-addon1" style="color: red"><i class="fa fa-trash"></i></span>'+
				'<button type="button" class="list-group-item eliminar" title="eliminar sector" data-sector="'+poly.content+'"> eliminar '+poly.content+'</button>'+
				'</div>'+
				'<div class="input-group" style="width: 250px; '+sta+'" id="E_'+poly.content+'">'+
				'<span class="input-group-addon" id="basic-addon1" style=""><i class="fa fa-pencil"></i></span>'+
				'<button type="button" class="list-group-item editar" title="editar sector" data-sector="'+poly.content+'">editar '+poly.content+'</button>'+
				'</div>'+
				'<div class="input-group" style="width: 250px; '+stb+'" id="S_'+poly.content+'">'+
				'<span class="input-group-addon" id="basic-addon1" style="color: green"><i class="fa fa-floppy-o"></i></span>'+
				'<button type="button" class="list-group-item guardar" title="guardar edición" data-sector="'+poly.content+'">guardar edición</button>'+
				'</div>'+
				'<div class="input-group" style="width: 250px; '+stb+'" id="C_'+poly.content+'">'+
				'<span class="input-group-addon" id="basic-addon1" style=""><i class="fa fa-ban"></i></span>'+
				'<button type="button" class="list-group-item cancelar" title="cancelar edición" data-sector="'+poly.content+'">cancelar edición</button>'+
				'</div>'+
				'';
//			for (var i =0; i < vertices.getLength(); i++) {// obtener coordenadas actuales
//			  var xy = vertices.getAt(i);
//			  contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' + xy.lng();
//			}

			infoWindow2.setContent(contentString);
			infoWindow2.setPosition(event.latLng);
			infoWindow2.open(map);
		  }
	}else{
		togglePolygon(id);
		
	}
	map.panTo(center);
	map.setZoom(13);
}

$(document).on("click", ".guardar", function(){
	var s = $(this).attr("data-sector");
	var constructCoord = [];
	for (var i = 0; i < gpolygons.length; i++) {
		if (gpolygons[i]._uniqueId == s) {
		  var vertices = gpolygons[i].getPath();
			for (var i =0; i < vertices.getLength(); i++) {// obtener coordenadas actuales
			  var xy = vertices.getAt(i);
				constructCoord.push(xy.lng() + ' ' + xy.lat());
			  //console.log('Coordinate ' + i + ':<br>' + xy.lat() + ',' + xy.lng());
			}
		}
	  }
	var ncoord = 'POLYGON ((' + constructCoord.join(', ') + '))';
	bootbox.confirm({
    title: "EDITA SECTOR "+s,
    message: '<strong>¿Seguro desea editar el sector '+s+'?</strong><br>'+
		'El polígono cambiará su forma según la modificación de vértices que haya hecho.',
    buttons: {
        cancel: {
            label: '<i class="fa fa-times"></i> Cancel',
			className: 'btn-success'
        },
        confirm: {
            label: '<i class="fa fa-check"></i> Confirm',
			className: 'btn-danger'
        }
    },
    callback: function (result) {
		if(result===true){
			$.ajax({
			  method: "POST",
			  url: "polygon_ajx_edit.php",
			  data: { cod: s, coord: ncoord, edit: 1 }
			})
			  .done(function( data ) {
				if(data==1){
					toggleEdit(s);
					if (infoWindow2) {infoWindow2.close();}
					$("#filtrar").trigger("click");
				}else{
					bootbox.alert(data);
					
				}

			  });
		}
		}
	});
});

$(document).on("click", ".eliminar", function(){
	var s = $(this).attr("data-sector");
	bootbox.confirm({
    title: "BORRA SECTOR "+s,
    message: '<strong>¿Seguro desea eliminar el sector '+s+'?</strong><br>'+
		'Este cambio es irreversible y dejará huérfanos los registros domiciliarios asociados.<br><br>'+
		'No obstante, podrá crear nuevamente el sector y los domicilios registrados se asociarán automáticamente, '+
		'siempre que tenga el mismo nombre anterior, es decir, que se llame '+s,
    buttons: {
        cancel: {
            label: '<i class="fa fa-times"></i> Cancel',
			className: 'btn-success'
        },
        confirm: {
            label: '<i class="fa fa-check"></i> Confirm',
			className: 'btn-danger'
        }
    },
    callback: function (result) {
		if(result===true){
			$.ajax({
			  method: "POST",
			  url: "polygon_ajx_delete.php",
			  data: { cod: s, del: 1 }
			})
			  .done(function( data ) {
				if(data==1){
					if (infoWindow2) {infoWindow2.close();}
					$("#filtrar").trigger("click");
				}else{
					bootbox.alert(data);
					
				}

			  });
		}
		}
	});

});

$(document).on("click", "#new", function(){
	$(this).attr("disabled","disabled");
	addDraw();
})
$(document).on("click", "#ncancel", function(){
	cancelPolygon();
	$("#new").show();
	$("#nsave").hide();
	$("#ncancel").hide();
	$("#filtrar").removeAttr('disabled');
	$("#region").removeAttr('disabled');
	$("#comuna").removeAttr('disabled');
	$("#buscar").removeAttr('disabled');
	$("#filtrar").trigger("click");
	
})

function savePrevPath(path){
	undoPaths=path;
}
