//Ladet Module
var http = require("http");
var fs = require('fs');
var os = require("os");

var parser = function(form) {
	var result = "";
	var string = "" + form;
	var length = string.length;
	var arr = [];
	var writeStr = false;
	for (var int = 0; int < 8; int++) {
		arr[int] = "";
	}
	var counter = 0;
	for (var i = 0; i < length; i++) {
		var char = string.charAt(i);
		if (writeStr === true && char !== '&') {
			arr[counter] += char;
		}
		if (char === '=') {
			writeStr = true;
			arr[counter] += " ";
		}
		if (char === '&') {
			writeStr = false;
			counter++;
		}
	}
	result = arr[1] + arr[0] + arr[6] + arr[3] + arr[4] + arr[7] + arr[5];
	return result;
};

http
		.createServer(
				function(req, res) {
					console.log("User connected to Server");
					var string;
					req.on('data', function(form) {
						string = "";
						string = parser(form);
						// Speichert in einen Textfile
						/*fs.writeFile("./player_data.txt", string + "\n",
								function(err) {
									if (err) {
										return console.log(err);
									}
									// console.log("The file was saved!");
								});
							*/
						fs.appendFile("./player_data.txt", string+"\r\n", function(err){
							if (err) { 
								return console.log(err);
							}
							});

					});

					res.writeHead(200, {
						'Content-Type' : 'text/plain'
					});
					res
							.end('Sie haben sich erfolgreich auf den WebServer mit der Url <127.0.0.1:8081> verbunden');
				}).listen(8080);
