# Awesome App
Cordova Project using geolocation, and contacts

This application consists of the following 2 features: 
- Your location is determined and displayed on page 2. 
- A random contact is generated each time you hit the "Contacts" tab. 

#How it works: 
## Feature 1:
- I use a special android method that searches for your location
- I extract the longitude and lattitude of your location 
- I use the longitude and lattitude to display an image of your location

## Feature 2: 
- Each time you press on the "Contacts" tab, a new random contact will load on the screen. 

## JavaScript: 
* All of the links and all of the tabs are placed in an array and compared with the tap event 
* When they both match, it is determined which tab the user pressed, and which function will run in that case. 
* The icons and inactive tabs will change accordingly. 
* The various methods used in my application are seperated into multiple files to improve organization. 
** app.js - contains the deviceready 
** content.js - contains the navigation, page load, and page show 
*** It will call the appropriate functions for the Contacts tab and the Maps tab. The location of these is explained below.
** getcontacts.js - this JavaScript file only deals with displaying a random contact 
** getgps.js - this JavaScript retrieves the user's location (longitude and latitude) and displays a map with a pointer to the location. 

#HTML/CSS:
- I am using data-role="page" for each section I would want to display to the user. 
- There are various transition and hiding events using display:block because the webpage is broken into sections which will display the appropriate content when it is clicked.  
- Pages are being hidden using z-index, display, visibility, etc. 
- There are also various transition effects.
