var decode_entities = (function() {
    // Remove HTML Entities
    var element = document.createElement('div');
    function decode_HTML_entities (str) {
        if(str && typeof str === 'string') {
            // Escape HTML before decoding for HTML Entities
            str = escape(str).replace(/%26/g,'&').replace(/%23/g,'#').replace(/%3B/g,';');
            element.innerHTML = str;
            if(element.innerText){
                str = element.innerText;
                element.innerText = '';
            }else{
                str = element.textContent;
                element.textContent = '';
            }
        }
        return unescape(str);
    }
    return decode_HTML_entities;
})();
$ = function(e){return document.getElementById(e);};
window.addEventListener("load",function(){
	if(venues == null){
		alert("Egad! No data.");
		return;
	}
	venues = decode_entities(venues);
	try{
		var vn = JSON.parse(venues);
	}catch(e){
		alert("Error! Parse Error");
	}
	if(vn.length == 0)
		return;
	var map = GeoLo.getMap("gmap", vn[0].location.lat, vn[0].location.lng); 
	for(var i = 0; i < Math.min(10, vn.length); i++){
		var title = document.createElement("h3");
		title.appendChild(document.createTextNode(vn[i].name));
		var information = document.createTextNode(vn[i].location.address);
		var p = document.createElement("p");
		p.appendChild(information);
		$("listing").appendChild(title);
		$("listing").appendChild(p);
		GeoLo.addMarker(map, vn[i].location.lat, vn[i].location.lng, 
			GeoLo.addInfoWindow(vn[i].location.lat, vn[i].location.lng, vn[i].name));
	}
	$("listing").
});