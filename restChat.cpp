#include <iostream>
#include <string>
#include <curl/curl.h>

std::string BASE_URL = "http://54.198.38.17:5005/";

int main() {
  // Initialize curl
  curl_global_init(CURL_GLOBAL_DEFAULT);

  // Login
  CURL *curl = curl_easy_init();
  if (curl) {
    std::string url = BASE_URL + "login";
    std::string body = "{\"username\": \"user\", \"password\": \"pass\"}";

    // Set curl options
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE_LARGE, (curl_off_t) body.size());
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Content-Type: application/json");

    // Send request
    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
      std::cerr << "Failed to send login request: " << curl_easy_strerror(res) << std::endl;
    } else {
      std::cout << "Login successful!" << std::endl;
    }

    // Cleanup curl
    curl_easy_cleanup(curl);
  } else {
    std::cerr << "Failed to initialize curl." << std::endl;
  }

  // Register
  curl = curl_easy_init();
  if (curl) {
    std::string url = BASE_URL + "register";
    std::string body = "{\"username\": \"user\", \"password\": \"pass\"}";

    // Set curl options
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE_LARGE, (curl_off_t) body.size());
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Content-Type: application/json");

    // Send request
    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
      std::cerr << "Failed to send registration request: " << curl_easy_strerror(res) << std::endl;
    } else {
      std::cout << "Registration successful!" << std::endl;
    }

    // Cleanup curl
    curl_easy_cleanup(curl);
  } else {
    std::cerr << "Failed to initialize curl." << std::endl;
  }

  // Chat
  curl = curl_easy_init();
  if (curl) {
    std::string url = BASE_URL + "chat";
    std::string body = "{\"message\": \"Hello, world!\"}";

    // Set curl options
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());
    curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE_LARGE, (curl_off_t) body.size());
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Content-Type: application/json");

    // Send request
    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
      std::cerr << "Failed to send chat request: " << curl_easy_strerror(res) << std::endl;
    } else {
      std::cout << "Chat message sent." << std::endl;
    }

    // Cleanup curl
    curl_easy_cleanup(curl);
  } else {
    std::cerr << "Failed to initialize curl." << std::endl;
  }

  // Cleanup curl
  curl_global_cleanup();

  return 0;
}
