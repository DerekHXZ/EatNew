var GeoLo = new function(){
	this.getLocation = function (callback) {
		if(navigator.geolocation == null || navigator.geolocation.getCurrentPosition == null){
			callback({
				accuracy: -1,
				latitude: 0,
				longitude: 0,
				message: "Error: Geolocation API not enabled or error with location"
			});
			return;
		}
		navigator.geolocation.getCurrentPosition(function(cb){
			callback(cb.coords);
		}, function(){
			callback({
				accuracy: -1,
				latitude: 0,
				longitude: 0,
				message: "Error: Geolocation API not enabled or error with location"
			});
		});
	};
	this.addInfoWindow = function(lat, lon, data){
		var iw = new google.maps.InfoWindow({
			position: new google.maps.LatLng(lat, lon),
			content: data
		});
		return iw;
	};
	this.addMarker = function (map, lat, lon, iw){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lon)
		});
		marker.setMap(map);
		marker.addEventListener("click",function(){
			iw.open();
		});
	};
	this.getMap = function (elem, lat, lon) {
		var mapOptions = {
			center: new google.maps.LatLng(lat,lon),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};                   
		var map = new google.maps.Map(document.getElementById(elem), mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat,lon)
		});                  
		marker.setMap(map);  
		return map;          
	};
	this.getAddress = function getLat(address, callback) {
        if (address) {       
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
				var result = 0;
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var lat = results[0].geometry.location.lat();
						var lon = results[0].geometry.location.lng();
						result = {latitude: lat, longitude: lon};
					}
				}
				callback(result);
			});
        } else {
			callback({latitude: 0, longitude: 0});
    	}
    }
}