#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

// Define User struct
struct User {
	string email;
	string password;
};

// Define Users map
unordered_map<string, User> users;

// Define function to check if username already exists
bool usernameExists(string username) {
	return users.count(username) > 0;
}

// Define function to check if email already exists
bool emailExists(string email) {
	for (auto it = users.begin(); it != users.end(); ++it) {
		if (it->second.email == email) {
			return true;
		}
	}
	return false;
}

// Define function to register a new user
void registerUser(string username, string email, string password) {
	User user = {email, password};
	users[username] = user;
}

// Define main function
int main() {
	// Define variables
	string username, email, password;
	vector<string> errors;

	// Get input from user
	cout << "Enter username: ";
	cin >> username;
	if (usernameExists(username)) {
		errors.push_back("Username already exists");
	}

	cout << "Enter email: ";
	cin >> email;
	if (emailExists(email)) {
		errors.push_back("Email already exists");
	}

	cout << "Enter password: ";
	cin >> password;
	if (password.length() < 6) {
		errors.push_back("Password must be at least 6 characters");
	}

	// Register user or return errors
if (errors.size() > 0) {
	cout << "Registration failed:" << endl;
	for (string error : errors) {
		cout << "- " << error << endl;
	}
} else {
	registerUser(username, email, password);
	cout << "Registration successful!" << endl;
}

return 0;
}
