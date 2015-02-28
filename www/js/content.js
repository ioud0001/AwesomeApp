// JavaScript Document
// anapp folder
var links = [];
var numLinks = 0;
var pageTime = 800;//same as CSS transition
var status = document.createElement("p");
//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);
function detectTouchSupport( ){
   msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
   touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
   return touchSupport;
}
function loadNav(){
	//device ready listener
	
	pages = document.querySelectorAll('[data-role="page"]');	
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="link"]');
	numLinks = links.length;
	
	for(var i=0;i<numLinks; i++){
		links[i].addEventListener("click", handleNav, false);	
	}
  //add the listener for pageshow to each page
  for(var p=0; p < numPages; p++){
    pages[p].addEventListener("pageShow", handlePageShow, false);
  }
	loadPage(null);
}

function handleNav(ev){
	
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	
	loadPage( parts[1] );	
  return false;
}

function handlePageShow(ev){
  ev.target.className = "active";
  			if (ev.target.id == "map")
			  {
				  var parameters = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
				  if (navigator.geolocation){
					  if (status.innerHTML == ""){
							status.innerHTML = "Loading the map...";
							document.getElementById("map").appendChild(status); 
				  		} 
						else {
					  	 status.innerHTML  = "Loading the map...";
						}
				  	navigator.geolocation.getCurrentPosition(reportGPS, gpsError, parameters);
					status.innerHTML = "Loading completed..."; 
				  }
				else
					alert("nothing works for me!");
	  		}
	 		else if (ev.target.id == "contacts")
	  		{
				checkContacts();
			
	 	 	}
			else
			return;
}

function loadPage( url ){
	
	console.log("the url is : " + url);
	if(url == null){
		//home page first call
		var pageCount = pages.length; 
		
		// hide the other pages and display the home page 
		for (var i = 0; i < pageCount; i++)
		{
			pages[0].className = "active";
			pages[i].className = "";
		}
		history.replaceState(null, null, "#home");
	}else{
     for(var i=0; i < numPages; i++){
	  pages[i].className = "";
      //get rid of all the hidden classes
      //but make them display block to enable anim.
	  
	  otherIcons = "svg" + pages[i].id; 
      if(pages[i].id == url){
        pages[i].className = "active";
        //add active to the proper page
        history.pushState(null, null, "#" + url);
        setTimeout(addDispatch, 50, i);
		 
      }
	  else if (pages[i].id == "map"){
		  this.addEventListener('click', this.getLocation);
	  }
	  else if (pages[i].id == "contacts"){
	   	this.addEventListener('click', this.checkContacts);
	  }
	
    }

    //set the activetab class on the nav menu
	// check the CSS, this will also change the icon state
    for(var t=0; t < numLinks; t++){
	  //links[t].className = "";
	  
      if(links[t].href == location.href)
        links[t].className = "activetab";
	else
        links[t].className = "inactivetab";
    }
  }
}



function addDispatch(num){
  pages[num].dispatchEvent(pageshow);
  //num is the value i from the setTimeout call
  //using the value here is creating a closure
}