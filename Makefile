CXX = g++
CXXFLAGS = -std=c++11

register: register.cpp
	$(CXX) $(CXXFLAGS) -o register register.cpp

deploy:
	cp restChat.html $(HTML_DIR)/restChat.html
	cp restChat.css $(CSS_DIR)/restChat.css
	cp restChat.js $(JS_DIR)/restChat.js

.PHONY: clean deploy

clean:
	rm -f register

