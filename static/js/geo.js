var Main = {
	fileSelection:"",
	coords:{lat:0,lon:0},
	timeBegin:"",
	timeEnd:"",
	accessToken:"",
	uid: 0,
	requestSent: false
}
var _ = function(e){return document.getElementById(e);}
function smoothScrollTo(e){
	var elm = document.getElementById(e);
	if(elm == null) return;
	var prev = window.pageYOffset;
	var xnew = Math.ceil(elm.offsetTop - (elm.offsetTop - window.pageYOffset) / 2);
	window.scrollTo(0, xnew);
	if(Math.abs(xnew - elm.offsetTop) > 1 && window.pageYOffset != prev){
		setTimeout(function(){smoothScrollTo(e);},80);
	}
}
window.addEventListener("load",function(){
	GeoLo.getLocation(function(coords){
		var ifr = GeoLo.getMap("gmap", coords.latitude, coords.longitude);
	});
	return;
});