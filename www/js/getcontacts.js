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
	var randomid = Math.floor(Math.random() * matches.length); 
	//alert(matches.length);
	var p = document.createElement("p");
	var ul = document.createElement("ul");
	var li = document.createElement("li"); 
		//alert("the id is : " + randomid);
	//alert(matches[randomid].displayName);

	var name = matches[randomid].displayName;
	if (!name)
		name = 	matches[randomid].name.nickname; 
	if (name == null)
		name == "No name added..."; 
	p.innerHTML = "Name : " + name;
	for (var count = 0; count < matches[randomid].phoneNumbers.length; count++){
		li.innerHTML = matches[randomid].phoneNumbers[count].value + " (" + matches[randomid].phoneNumbers[count].type + ")"; 
		ul.appendChild(li);
	}
	contacts.appendChild(p);
	 
	contacts.appendChild(ul);
}

function searchError(){
	
	console.log("there was an error");
}