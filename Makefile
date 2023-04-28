# MakeFile for restChat
# server using C++ Microservice
# sudo mkdir /var/www/html/restChat
# sudo chown ubuntu /var/www/html/restChat																				

# Makefile for Flask web application

CXX = g++
CXXFLAGS = -std=c++11

all: register

register: register.cpp
$(CXX) $(CXXFLAGS) -o register register.cpp

clean:
	rm -f register



deploy:
	cp restChat.html $(HTML_DIR)
	cp restChat.css $(CSS_DIR)
	cp restChat.js $(JS_DIR)

# Phony targets
.PHONY: install run lint clean deploy


clean:
	rm restChat *.o
