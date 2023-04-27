$(document).ready(function() {
    // Register Form Submit
    $('#register-form').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get form data
        var username = $('#register-username').val();
        var email = $('#register-email').val();
        var password = $('#register-password').val();

        // Send AJAX request to register user
        $.ajax({
            url: '/chat/register/' + username + '/' + email + '/' + password,
            type: 'POST',
            success: function(response) {
                if (response.status == 'success') {
                    alert('Registration successful!');
                } else {
                    alert('Registration failed: ' + response.error);
                }
            },
            error: function() {
                alert('Registration failed. Please try again later.');
            }
        });
    });

    // Login Form Submit
    $('#login-form').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get form data
        var username = $('#login-username').val();
        var password = $('#login-password').val();

        // Send AJAX request to login user
        $.ajax({
            url: '/chat/login/' + username + '/' + password,
            type: 'POST',
            success: function(response) {
                if (response.status == 'success') {
                    alert('Login successful!');
                } else {
                    alert('Login failed: ' + response.error);
                }
            },
            error: function()
            alert('Login failed. Please try again later.');
        }
    });
});

// Chat Form Submit
$('#chat-form').submit(function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get form data
    var message = $('#chat-message').val();

    // Send AJAX request to send chat message
    $.ajax({
        url: '/chat/send/' + message,
        type: 'POST',
        success: function(response) {
            if (response.status == 'success') {
                // Clear chat message input field
                $('#chat-message').val('');
            } else {
                alert('Chat message failed to send.');
            }
        },
        error: function() {
            alert('Chat message failed to send. Please try again later.');
        }
    });
});

// Update Chat Messages and Current Users
setInterval(function() {
    // Send AJAX request to get chat messages and current users
    $.ajax({
        url: '/chat/update',
        type: 'GET',
        success: function(response) {
            if (response.status == 'success') {
                // Update chat messages
                var messagesHtml = '';
                for (var i = 0; i < response.messages.length; i++) {
                    var message = response.messages[i];
                    messagesHtml += '<p><strong>' + message.username + ':</strong> ' + message.message + '</p>';
                }
                $('#chat-messages').html(messagesHtml);

                // Update current users
                var usersHtml = '';
                for (var i = 0; i < response.users.length; i++) {
                    var user = response.users[i];
                    usersHtml += '<p>' + user.username + '</p>';
                }
                $('#current-users').html(usersHtml);
            }
        },
        error: function() {
            alert('Failed to update chat messages and current users.');
        }
    });
}, 1000);
});
