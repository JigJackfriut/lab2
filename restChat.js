var baseUrl = 'http://54.198.38.17:5005';
var state="off";
var myname="";
var inthandle;

/* Start with text input and status hidden */
document.getElementById('chatinput').style.display = 'none';
document.getElementById('status').style.display = 'none';
document.getElementById('leave').style.display = 'none';
// Action if they push the join button
document.getElementById('login-btn').addEventListener("click", (e) => {
	join();
})

/* Set up buttons */
document.getElementById('leave-btn').addEventListener("click", leaveSession);
document.getElementById('send-btn').addEventListener("click", sendText);

// Watch for enter on message box
document.getElementById('message').addEventListener("keydown", (e)=> {
    if (e.code == "Enter") {
	sendText();
    }   
});


// Call function on page exit
window.onbeforeunload = leaveSession;


function completeJoin(results) {
	var status = results['status'];
	if (status != "success") {
		alert("Username already exists!");
		leaveSession();
		return;
	}
	var user = results['user'];
	console.log("Join:"+user);
	startSession(user);
}

function join() {
	myname = document.getElementById('yourname').value;
	fetch(baseUrl+'/chat/join/'+myname, {
        method: 'get'
    })
    .then (response => response.json() )
    .then (data =>completeJoin(data))
    .catch(error => {
        {alert("Error: Something went wrong:"+error);}
    })
}

function completeSend(results) {
	var status = results['status'];
	if (status == "success") {
		console.log("Send succeeded")
	} else {
		alert("Error sending message!");
	}
}

//function called on submit or enter on text input
function sendText() {
    var message = document.getElementById('message').value;
    console.log("Send: "+myname+":"+message);
	fetch(baseUrl+'/chat/send/'+myname+'/'+message, {
        method: 'get'
    })
    .then (response => response.json() )
    .then (data =>completeSend(data))
    .catch(error => {
        {alert("Error: Something went wrong:"+error);}
    })    

}

function completeFetch(result) {
	messages = result["messages"];
	messages.forEach(function (m,i) {
		name = m['user'];
		message = m['message'];
		document.getElementById('chatBox').innerHTML +=
	    	"<font color='red'>" + name + ": </font>" + message + "<br />";
	});
}

/* Check for new messaged */
function fetchMessage() {
	fetch(baseUrl+'/chat/fetch/'+myname, {
        method: 'get'
    })
    .then (response => response.json() )
    .then (data =>completeFetch(data))
    .catch(error => {
        {console.log("Server appears down");}
    })  	
}
/* Functions to set up visibility of sections of the display */
function startSession(name){
    state="on";
    
    document.getElementById('yourname').value = "";
    document.getElementById('register').style.display = 'none';
    document.getElementById('user').innerHTML = "User: " + name;
    document.getElementById('chatinput').style.display = 'block';
    document.getElementById('status').style.display = 'block';
    document.getElementById('leave').style.display = 'block';
    /* Check for messages every 500 ms */
    inthandle=setInterval(fetchMessage,500);
}

function leaveSession(){
    state="off";
    
    document.getElementById('yourname').value = "";
    document.getElementById('register').style.display = 'block';
    document.getElementById('user').innerHTML = "";
    document.getElementById('chatinput').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    document.getElementById('leave').style.display = 'none';
	clearInterval(inthandle);
}


function getUsers() {
	fetch(baseUrl+'/chat/userlist', {
        method: 'get'
    })
    .then (response => response.json() )
    .then (data =>updateUsers(data))
    .catch(error => {
        {alert("Error: Something went wrong:"+error);}
    })
}
function updateUsers(result) {
	userList = result["userList"];
	//console.log("user list printed");
	document.getElementById('userlist').innerHTML = userList;
}

//functions to register a user , /chat/register/username/email/password
document.getElementById('submitButton').addEventListener("click", registerUser);
function registerUser(){
	console.log("registerUser() running");
	username = document.getElementById('user-name').value;
	email = document.getElementById('user-email').value;
	pass = document.getElementById('user-password').value;
	fetch(baseUrl+'/chat/register/'+username +'/'+email+'/'+pass, {
        method: 'get'
    })
    .then (response => response.json() )
    .then (data =>completeRegisterUser(data))
    .catch(error => {
        {alert("Error: Something went wrong:"+error);}
    })
}

function completeRegisterUser(results){
	var status = results['status'];
	console.log(status)
	if (status != "success") {
		alert("Username or Email already exists! Password must be more than 6 characters");
		leaveSession();
		return;
	}
	var user = results['user'];
	alert("Registration Successful");
	console.log("Registered:"+user);
	username = document.getElementById('user-name').value = '';
	email = document.getElementById('user-email').value = '';
	pass = document.getElementById('user-password').value = '';
}

//Function to remove a user after they leave the site.
function removeUser(){
		fetch(baseUrl+'/chat/userlist/remove/'+nameHold, {
        method: 'get'
    })
}	

let gateway = 0;
//Functions to update the server as to whether someone is typing
function checkTyping(){
	var message = document.getElementById('message').value;
	//console.log(message);
		if(message != ""){
		updateTyping();
	} else{
		removeTyping();
	}
}

function updateUsersSam(data){
	//console.log(data);
	fetchTypers();
	const users = data['userList'];
	//Returning list like Grant,Sammy,Joe,etc. and then turning it into a javascript array.
	//https://dev.to/sanchithasr/6-ways-to-convert-a-string-to-an-array-in-javascript-1cjg
	//https://www.educative.io/answers/how-to-add-an-id-to-element-in-javascript
	const usersArray = users.split(',');
	console.log(users);
	console.log(typerArray);
	//console.log(usersArray);
    // Get the user list container element
    const userBar = document.getElementById('bottomPageList');
    // Clear any existing user list items
    userBar.innerHTML = '';
	let numGate = 0;
	let listNum = "a";
    // Create a new list item for each user and append it to the user list, first user added will have blue background
    usersArray.forEach((user) => {
		if(typerArray == null){
			if(numGate == 0){
				const listItem = document.createElement('li');
				//Set the Class of the list , then after set the ID and Text
				listItem.classList.add('list-group-item');
				listItem.classList.add('active');
				listItem.setAttribute('id' , listNum);
				listItem.textContent = user;
				userBar.appendChild(listItem);
				const spanItem = document.createElement('span');
				//Set the Class of the Span in the list , then after set the Text
				spanItem.classList.add('badge');
				spanItem.classList.add('rounded-pill');
				spanItem.classList.add('bg-success');
				spanItem.textContent = "Online";
				listItem.appendChild(spanItem);
				numGate += 1;
				listNum += "a";
			}else{
				const listItem = document.createElement('li');
				listItem.classList.add('list-group-item');
				listItem.setAttribute('id' , listNum);
				listItem.textContent = user;
				userBar.appendChild(listItem);
				const spanItem = document.createElement('span');
				spanItem.classList.add('badge');
				spanItem.classList.add('rounded-pill');
				spanItem.classList.add('bg-success');
				spanItem.textContent = "Online";
				listItem.appendChild(spanItem);
				listNum += "a";
			}
		}else{
			if(numGate == 0 && typerArray.includes(user) == true){
				let userStatus = "Is typing...";
				UpdateUsersSamTyping(user , listNum , userBar , userStatus);
				numGate += 1;
				listNum += "a";
		}else{
			if(numGate == 0 && typerArray.includes(user) == false){
				let userStatus = "Online";
				UpdateUsersSamTyping(user , listNum , userBar , userStatus);
				numGate += 1;
				listNum += "a";
		}else{
			if(numGate == 0 && typerArray.includes(user) == false){
				let userStatus = "Is typing...";
				UpdateUsersSamTyping(user , listNum , userBar , userStatus);
				numGate += 1;
				listNum += "a";
			}else{
				if(numGate != 0 && typerArray.includes(user) == true){
					let userStatus = "Is typing...";
					UpdateUsersSamNotTyping(user , listNum , userBar , userStatus);
					listNum += "a";
				}else{
					let userStatus = "Online";
					UpdateUsersSamNotTyping(user , listNum , userBar , userStatus);
					listNum += "a";
				}
			}
		}		
	}
}})};

function fetchUsers() {
    fetch(baseUrl+'/chat/users', {
        method: 'get'
    })
    .then(response => response.json())
    .then(data => updateUsersSam(data))
    .catch(error => {
        console.log("Error fetching user list:", error);
    });
}
// Call fetchUsers every 5 seconds to update the user list

function fetchTypers() {
    fetch(baseUrl+'/chat/users/typing', {
        method: 'get'
    })
    .then(response => response.json())
    .then(data => makeTyperArray(data))
    .catch(error => {
        console.log("No users are typing so there is no JSON object to fetch", error);
		typerArray = null;
    });
}

var typerArray = "";
function makeTyperArray(data){
	console.log(data);
	const users = data['typerList'];
	//Returning list like Grant,Sammy,Joe,etc. and then turning it into a javascript array.
	//https://dev.to/sanchithasr/6-ways-to-convert-a-string-to-an-array-in-javascript-1cjg
	typerArray = users.split(',');
}


