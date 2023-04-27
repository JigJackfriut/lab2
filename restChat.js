$(document).ready(function() {
    // Function to get chat messages and current users
    function getMessagesAndUsers() {
        // Make a GET request to /chat/messages endpoint
        $.ajax({
            url: '/chat/messages',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // Display messages in #chat-messages div
                var messages = response.messages;
                var messageHtml = '';
                for (var i = 0; i < messages.length; i++) {
                    messageHtml += '<p><strong>' + messages[i].username + ':</strong> ' + messages[i].message + '</p>';
                }
                $('#chat-messages').html(messageHtml);

                // Display current users in #current-users div
                var users = response.users;
                var usersHtml = '<p>Current users:</p><ul>';
                for (var j = 0; j < users.length; j++) {
                    usersHtml += '<li>' + users[j] + '</li>';
                }
                usersHtml += '</ul>';
                $('#current-users').html(usersHtml);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

    // Call getMessagesAndUsers function on page load
    getMessagesAndUsers();

    // Set up interval to call getMessagesAndUsers function every 5 seconds
    setInterval(getMessagesAndUsers, 5000);

    // Function to send a chat message
    function sendMessage() {
        // Get the chat message from the input field
        var message = $('#chat-message').val();

        // Make a POST request to /chat/messages endpoint
        $.ajax({
            url: '/chat/messages',
            method: 'POST',
            data: {
                message: message
            },
            dataType: 'json',
            success: function(response) {
                // Do something with the response (if needed)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

        // Clear the input field
        $('#chat-message').val('');
    }

    // Call sendMessage function when chat form is submitted
    $('#chat-form').submit(function(event) {
        event.preventDefault();
        sendMessage();
    });

    // Function to register a new user
    function registerUser() {
        // Get the registration form data
        var username = $('#register-username').val();
        var email = $('#register-email').val();
        var password = $('#register-password').val();

        // Make a POST request to /chat/register endpoint
        $.ajax({
            url: '/chat/register',
            method: 'POST',
            data: {
                username: username,
                email: email,
                password: password
            },
            dataType: 'json',
            success: function(response) {
                // Do something with the response (if needed)
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

        // Clear the registration form fields
        $('#register-username').val('');
        $('#register-email').val('');
        $('#register-password').val('');
    }

    // Call registerUser function when registration form is submitted
    $('#register-form').submit(function(event) {
        event.preventDefault();
        registerUser();
    });
});
