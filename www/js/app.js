// New File - Feb 24
var app = {
  name: "Anna Ioudovskaya - Cordova Web App 1 - (Semester 2)",
  version: "1.0.0",
  pages: [], // create an array of all pages
  // one by default
  // "init" is a function expression
  // Application Constructor
    initialize: function() {
        app.bindEvents();
    },
	// Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		document.addEventListener("DOMContentLoaded", app.domReady);
        document.addEventListener('deviceready', app.deviceReady, false);
    },
  deviceReady: function( ){ // loads for android
  	//add Cordova Plugin listeners
	app.receivedEvent('deviceready');

  },
  domReady: function( ){ // loads for browser
    //add listeners for pages, links, interface, etc
    //populate the pages array
	pages = document.querySelectorAll('[data-role="page"]');
	numPages = pages.length;
	loadNav();
  },
  receivedEvent: function(id) {
	 
    var parentElement = document.getElementById(id);
		
	//detectTouch();
	var numPages = 0;
	var pageShow = document.createEvent("CustomEvent"); 
	pageShow.initEvent("pageShow", false, true); 
	pages = document.querySelectorAll('[data-role="page"]'); 
	numPages = pages.length; 
	loadNav();

		
        console.log('Received Event: ' + id);
    },
  somethingElse: function( ){
                      
  }
};

app.initialize();

