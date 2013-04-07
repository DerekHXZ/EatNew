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
		_("map").appendChild(ifr);
	});
	return;
	_("finishRetBtn").addEventListener("click",function(){
		smoothScrollTo("section1");
		_("section2").style.display = "none";
		_("section3").style.display = "none";
		_("section4").style.display = "none";
		$("#fileselection").text("");
		Main = {
			fileSelection:"",
			coords:{lat:0,lon:0},
			timeBegin:"",
			timeEnd:"",
			accessToken:Main.accessToken,
			requestSent: false
		}
	});
	_("pickerbtn").addEventListener("click",function(){
		filepicker.pick({},function(g){
			$("#section3").css("display","");
			smoothScrollTo("section3");
			$("#fileselection").text("You've selected \"" + g.filename + "\"!");
			Main.fileSelection = g;
		},function(h){
			
		});
	});
});