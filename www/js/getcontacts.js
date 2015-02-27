function checkContacts(){
	// if there are no contacts, ask the user to create one
	if (!navigator.contacts){
		var p = navigator.contacts.create(); 
		p.firstName = "Steve"; 
		p.save(); 
		if (navigator.contacts)
		alert("it works");
	
		var myContact = navigator.contacts.create({"displayName": "Test User"});
        myContact.note = "This contact has a note.";
        alert("The contact, " + myContact.displayName + ", note: " + myContact.note); 
		
	}
	else
	{
		var options = new ContactFindOptions( );
		options.filter = "";  //leaving this empty will find return all contacts
		options.multiple = true;  //return multiple results
		var filter = ["displayName"];    //an array of fields to compare against the options.filter 
		console.log("finding a contact");
		navigator.contacts.find(filter, showContacts, searchError, options);
		
		
	}
}

function showContacts(matches){
	var contacts = document.getElementById("showcontacts"); 
	var randomid = Math.floor(Math.random * matches.length); 
	alert(matches.length);
	var p = document.createElement("p");
	p.innerHTML = matches[randomid].displayName;
	contacts.appendChild(p);
	/*
		for( var i=0; i<matches.length; i++){
		contacts.appendChild(p);
		p.innerHTML =  matches[randomid].displayName;
		contacts.appendChild(p);
		}
	*/
}

function searchError(){
	
	console.log("there was an error");
}