const BASE_URL = "http://54.198.38.17:5005/";

const messageContainer = document.getElementById("message-container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const chatForm = document.getElementById("chat-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const messageInput = document.getElementById("message-input");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const sendButton = document.getElementById("send-button");

let loggedInUsers = [];

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
}

function updateLoggedInUsers() {
  fetch(BASE_URL + "logged-in-users")
    .then(response => response.text())
    .then(data => {
      const lines = data.split("\n");
      loggedInUsers = lines.slice(1, lines.length-1); // remove header and footer
    })
    .catch(error => console.error("Error fetching logged in users:", error));
}

function login() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  fetch(BASE_URL + "login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      if (response.ok) {
        appendMessage("Login successful!");
        loginForm.style.display = "none";
        chatForm.style.display = "block";
        updateLoggedInUsers();
      } else {
        appendMessage("Login failed.");
      }
    })
    .catch(error => console.error("Error logging in:", error));
}

function register() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  fetch(BASE_URL + "register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      if (response.ok) {
        appendMessage("Registration successful!");
      } else {
        appendMessage("Registration failed: " + response.statusText);
      }
    })
    .catch(error => console.error("Error registering:", error));
}

function sendMessage() {
  const message = messageInput.value.trim();
  const username = usernameInput.value.trim();
  const timestamp = new Date().toLocaleTimeString();
  const fullMessage = `${timestamp} ${username}: ${message}`;
  appendMessage(fullMessage);
  messageInput.value = "";
  fetch(BASE_URL + "chat", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      if (!response.ok) {
        appendMessage("Error sending message: " + response.statusText);
      }
    })
    .catch(error => console.error("Error sending message:", error));
}

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  login();
});

registerForm.addEventListener("submit", event => {
  event.preventDefault();
  register();
});

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage();
});

// Poll for new messages every second
setInterval(() => {
  fetch(BASE_URL + "chat")
    .then(response => response.text())
    .then(data => {
      messageContainer.innerHTML = data;
    })
    .catch(error => console.error("Error fetching chat messages:", error));
}, 
