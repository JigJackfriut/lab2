$(document).ready(function() {
  // Handle submit event for login form
  $("#login-form").submit(function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Serialize form data
    var formData = $(this).serialize();
    
    // Send AJAX request to C++ backend
    $.ajax({
      url: "http://54.198.38.17:5005/login",
      type: "POST",
      data: formData,
      success: function(response) {
        // Display response from server
        $("#status").html(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Display error message
        $("#status").html("Error: " + textStatus + " - " + errorThrown);
      }
    });
  });
  
  // Handle submit event for register form
  $("#register-form").submit(function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Serialize form data
    var formData = $(this).serialize();
    
    // Send AJAX request to C++ backend
    $.ajax({
      url: "http://54.198.38.17:5005/register",
      type: "POST",
      data: formData,
      success: function(response) {
        // Display response from server
        $("#status").html(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Display error message
        $("#status").html("Error: " + textStatus + " - " + errorThrown);
      }
    });
  });
});


success: function(response) {
  // Display response from server
$('#status').text('successful');
}

setInterval(function() {
  $.ajax({
    url: 'http://54.198.38.17:5005/logged-in-users',
    type: 'GET',
    success: function(users) {
      $('#logged-in-users').empty();
      for (var i = 0; i < users.length; i++) {
        $('#logged-in-users').append($('<li>').text(users[i]));
      }
    }
  });
}, 1000);

