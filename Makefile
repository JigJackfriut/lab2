all: PutHTML restChat

PutHTML:
	cp restChat.html /var/www/html/restChat/
	cp restChat.css /var/www/html/restChat/
	cp restChat.js /var/www/html/restChat/
	
	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/restChat/

restChat : restChat.cpp httplib.h
	$(CXX) -o restChat $(CXXFLAGS) restChat.cpp $(OPENSSL_SUPPORT) $(ZLIB_SUPPORT) $(BROTLI_SUPPORT) 

clean:
	rm restChat *.o
