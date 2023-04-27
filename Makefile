# MakeFile for restChat
# server using C++ Microservice
# sudo mkdir /var/www/html/restChat
# sudo chown ubuntu /var/www/html/restChat																				

# Makefile for Flask web application

# Variables
PYTHON=python3
PIP=pip3
HTML_DIR=/var/www/html/lab2/
CSS_DIR=/var/www/html/lab2/
JS_DIR=/var/www/html/lab2/

# Targets
install:
	$(PIP) install -r requirements.txt

run:
	$(PYTHON) app.py

lint:
	pylint app.py

clean:
	$(RM) __pycache__/
	$(RM) */__pycache__/
	$(RM) *.pyc
	$(RM) */*.pyc

deploy:
	cp restChat.html $(HTML_DIR)
	cp restChat.css $(CSS_DIR)
	cp restChat.js $(JS_DIR)

# Phony targets
.PHONY: install run lint clean deploy


clean:
	rm restChat *.o
