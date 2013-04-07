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
}