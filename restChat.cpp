//
//  namesAPI.cc - a microservice demo program
//
// James Skon
// Kenyon College, 2022
//

/  namesAPI.cc - a microservice demo program
//
// James Skon
// Kenyon College, 2022
//

#include <iostream>
#include <fstream>
#include <map>
#include <algorithm>
#include "httplib.h"

using namespace httplib;
using namespace std;

const int port = 5005;

void addMessage(string username, string message, map<string,vector<string>> &messageMap) {
    /* iterate through users adding message to each */
    string jsonMessage = "{\"user\":\""+username+"\",\"message\":\""+message+"\"}";
    for (auto userMessagePair : messageMap) {
        username = userMessagePair.first;
        messageMap[username].push_back(jsonMessage);
    }
}

string getMessagesJSON(string username, map<string,vector<string>> &messageMap) {
    /* retrieve json list of messages for this user */
    bool first = true;
    string result = "{\"messages\":[";
    for (string message :  messageMap[username]) {
        if (not first) result += ",";
        result += message;
        first = false;
    }
    result += "]}";
    messageMap[username].clear();
    return result;
}

int main(void) {
  Server svr;
  int nextUser=0;
  map<string,vector<string>> messageMap;
  map<string,string> usersMap;
  map<string,string> emailMap;

  /* "/" just returnsAPI name */
  svr.Get("/", [](const Request & /*req*/, Response &res) {
    res.set_header("Access-Control-Allow-Origin","*");
    res.set_content("Chat API", "text/plain");
  });


  svr.Get(R"(/chat/join/(.*))", [&](const Request& req, Response& res) {
    res.set_header("Access-Control-Allow-Origin","*");
    string username = req.matches[1];
    string result;
    vector<string> empty;
    
    // Check if user with this name exists
    if (messageMap.count(username)) {
        result = "{\"status\":\"exists\"}";
    } else {
        // Add user to messages map
        messageMap[username]=empty;
        result = "{\"status\":\"success\",\"user\":\"" + username + "\"}";
    }
    res.set_content(result, "text/json");
  });

   svr.Get(R"(/chat/send/(.*)/(.*))", [&](const Request& req, Response& res) {
    res.set_header("Access-Control-Allow-Origin","*");
    string username = req.matches[1];
    string message = req.matches[2];
    string result; 
    
    if (!messageMap.count(username)) {
        result = "{\"status\":\"baduser\"}";
    } else {
        addMessage(username,message,messageMap);
        result = "{\"status\":\"success\"}";
    }
    res.set_content(result, "text/json");
  });
  
   svr.Get(R"(/chat/fetch/(.*))", [&](const Request& req, Response& res) {
    string username = req.matches[1];
    res.set_header("Access-Control-Allow-Origin","*");
    string resultJSON = getMessagesJSON(username,messageMap);
    res.set_content(resultJSON, "text/json");
  });

  svr.Get(R"(/chat/register/(.*)/(.*)/(.*))", [&](const Request& req, Response& res) {
    res.set_header("Access-Control-Allow-Origin","*");
    string username = req.matches[1];
    string email = req.matches[2];
    string password = req.matches[3];
    string result; 

    if (usersMap.count(username)) {
        result = "{\"status\":\"fail\",\"message
svr.Get(R"(/chat/register/(.*)/(.*)/(.*))", [&](const Request& req, Response& res) {
    res.set_header("Access-Control-Allow-Origin","*");
    string username = req.matches[1];
    string email = req.matches[2];
    string password = req.matches[3];
    string result;

    // Check if username already exists
    if (usersMap.count(username)) {
        result = "{\"status\":\"fail\",\"message\":\"Username already exists\"}";
    } else {
        // Check if password is at least 6 characters long
        if (password.length() < 6) {
            result = "{\"status\":\"fail\",\"message\":\"Password must be at least 6 characters long\"}";
        } else {
            // Check if email already exists
            bool emailExists = false;
            for (auto const& user : usersMap) {
                if (user.second.email == email) {
                    emailExists = true;
                    break;
                }
            }
            if (emailExists) {
                result = "{\"status\":\"fail\",\"message\":\"Email already exists\"}";
            } else {
                // Add new user to usersMap
                User newUser(email, password);
                usersMap[username] = newUser;
                result = "{\"status\":\"success\"}";
            }
        }
    }
    res.set_content(result, "text/json");
});
