var _ = function(e){return document.getElementById(e);}

window.addEventListener("load",function(){
	GeoLo.getLocation(function(coords){
	    if(coords.accuracy == -1 && coords.message != null){
			document.getElementById("gmap").innerHTML = "<div style='margin:auto'> Loading Map Failed </div>";
			document.getElementById("gmap").style.backgroundColor = "#eee";
			document.getElementById("submitCoords").addEventListener("click",function(){alert("Geodata API Failed");});
			return;
		}
		var ifr = GeoLo.getMap("gmap", coords.latitude, coords.longitude);
		document.getElementById("val_lat").value = coords.latitude;
		document.getElementById("val_lon").value = coords.longitude;
		document.getElementById("submitCoords").addEventListener("click",function(){
			document.getElementById("postfrm").submit();
		});
	});
	return;
});