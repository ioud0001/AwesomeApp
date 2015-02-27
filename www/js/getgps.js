// JavaScript Document
function getLocation(){
	var parameters = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
	if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(reportGPS, gpsError, parameters);
	else
	alert("nothing works for me!");
}
function reportGPS( position ){ 
	// create the canvas area  
	var canvasdiv = document.getElementById("canvasdiv");
	//var context = canvas.getContext("2d");
	var dimensions = 350;

	
	// retrieve the google image according to the longitude and latitude 
	
	var coordinates = position.coords.latitude + ',' + position.coords.longitude;
	
	var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
	mapUrl = mapUrl + coordinates 
			+ '&zoom=14&size=' + dimensions + 'x' + dimensions 
			+ '&maptype=terrain&sensor=true&markers=size:mid%7Ccolor:red%7C' 
			+ coordinates;

	
	// create the image and set the attributes for the image
	
	var imgsrc = new Image;
	imgsrc.height = dimensions;
	imgsrc.width = dimensions;
	// add the map source to the image source,
	// and draw the image to the canvas area 
	
	imgsrc.src = mapUrl;
	
	// prevents the creation of multiple images if one already exists
	if (canvasdiv.childElementCount == 0)
		canvasdiv.appendChild(imgsrc);
}


function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}