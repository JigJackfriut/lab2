#include <iostream>
#include <string>
#include <vector>
#include "httplib.h"

using namespace std;
using namespace httplib;

struct User {
    string username;
    string password;
    bool loggedIn;
};

vector<User> users;

// Function to check if a username exists in the user list
bool usernameExists(string username) {
    for (User user : users) {
        if (user.username == username) {
            return true;
        }
    }
    return false;
}

// Function to check if a username and password match a user in the user list
bool authenticateUser(string username, string password) {
    for (User& user : users) { // Use reference to modify login status
        if (user.username == username && user.password == password) {
            user.loggedIn = true;
            return true;
        }
    }
    return false;
}

void handleRegistration(const Request& req, Response& res) {
    string username = req.get_param_value("username");
    string password = req.get_param_value("password");
    if (usernameExists(username)) {
        res.set_content("Username already exists.", "text/plain");
    } else {
        User newUser = {username, password, false};
        users.push_back(newUser);
        res.set_content("Registration successful!", "text/plain");
    }
}

void handleLogin(const Request& req, Response& res) {
    string username = req.get_param_value("username");
    string password = req.get_param_value("password");
    if (authenticateUser(username, password)) {
        res.set_content("Login successful!", "text/plain");
    } else {
        res.set_content("Invalid username or password.", "text/plain");
    }
}

void handleLoggedInUsers(const Request& req, Response& res) {
    string output = "Logged in users:\n";
    for (User user : users) {
        if (user.loggedIn) {
            output += user.username + "\n";
        }
    }
    res.set_content(output, "text/plain");
}

int main() {
    
    Server svr;

    // Serve HTML and JavaScript files
    svr.set_mount_point("/", "./");
    svr.set_mount_point("/", "./restChat.html");

    svr.set_file_extension_and_mimetype_mapping("html", "text/html");
    svr.set_file_extension_and_mimetype_mapping("js", "application/javascript");

    // Register HTTP request handlers
    svr.Post("/register", handleRegistration);
    svr.Post("/login", handleLogin);
    svr.Get("/logged-in-users", handleLoggedInUsers);

    
   svr.listen("54.198.38.17", 5005);


    return 0;
}

