

	var http = require("http");
	var port = 8080;
	var server = http.createServer(function (req, res){
		console.log("User connected to Server");
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Sie haben sich erfolgreich auf den WebServer mit der Url 127.0.0.1:8080 verbunden');
	});
	server.listen(port);
	//console.log('Der Server ist erreichbar unter http://127.0.0.1:' + port + '/');
	