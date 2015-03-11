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
		links[i].addEventListener("touchend", touchHandler, false);	
	}
  //add the listener for pageshow to each page
  for(var p=0; p < numPages; p++){
    pages[p].addEventListener("pageShow", handlePageShow, false);
  }
	loadPage(null);
}

function touchHandler(ev){
  //this function will run when the touch events happen
  if( ev.type == "touchend"){
    ev.preventDefault();
    var touch = ev.changedTouches[0];        //this is the first object touched
    
    var newEvt = document.createEvent("MouseEvent");	//old method works across browsers, though it is deprecated.
    /**
    event.initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget); **/
    newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    //var newEvt = new MouseEvent("click");				//new method
    //REF: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.MouseEvent
    ev.currentTarget.dispatchEvent(newEvt);
    //change the touchend event into a click event and dispatch it immediately
    //this will skip the built-in 300ms delay before the click is fired by the browser
  }
 handleNav(ev)
  // the event is "touchend" instead of click
  // the function is touchHandler instead of handleNav for the event clicker 
}

function handleNav(ev){
	
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	
	loadPage( parts[1] );	
  return false;
}

function handlePageShow(ev){

  			if (ev.target.id == "map")
			  {
				    //ev.target.className = "active";
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
				  //ev.target.className = "active";
				checkContacts();
			
	 	 	}
			else
			return;
}

function loadPage( url ){
	
	//console.log("the url is : " + url);
	var pageCount = pages.length;
	
		for (var i = 0; i < pageCount; i++)
		{
			pages[i].className = "";
			if (url == null){
				pages[0].className = "active";
				pages[i].className = "";
				history.replaceState(null, null, "#home");
			} else if (pages[i].id == url){
				//var id = pages[i].id;
					pages[i].className = "active";
				history.pushState(null, null, "#" + url);
				 setTimeout(addDispatch, 50, i); 
			}
			//pages[i].className = "";
			
			otherIcons = "svg" + pages[i].id;
		}
    //set the activetab class on the nav menu
	// check the CSS, this will also change the icon state
    for(var t=0; t < numLinks; t++){

      if(links[t].href == location.href)
        links[t].className = "activetab";
	else
        links[t].className = "inactivetab";
    }
  
}



function addDispatch(num){
  pages[num].dispatchEvent(pageshow);
  //num is the value i from the setTimeout call
  //using the value here is creating a closure
}