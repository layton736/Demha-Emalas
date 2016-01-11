var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Filtert JSON datei nach favoriten
function filter(arr) {
	var newArr = [];
	var pos = 0;
	for (var int = 0; int < arr.length; int++) {
		if (arr[int].isFavorite) {
			newArr[pos++] = arr[int];
		}
	}
	return newArr;
}
var parser = function(arr) {

	return arr.firstname + " " + arr.surname + " " + arr.year + " "
			+ arr.headcoach + " " + arr.asisstantcoach + " " + arr.position
			+ " " + arr.number;
};

app.get('/', function(req, res) {
	res.send("Eintrag erfolgreich");
});
// Bekommt die anfrage
app.put('/Player', function(req, res) {
	var string = "";
	
	string = parser(req.body);
	fs.appendFile("../text/player_data.txt", string + "\r\n", function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("Erfolg");
	});
});
app.get('/AllPlayer', function(req, res) {
	var arr = JSON.parse(fs.readFileSync('db.json'));
	res.send(arr);
});
app.get('/Favorites', function(req, res) {
	var arr = JSON.parse(fs.readFileSync('db.json'));
	res.send(filter(arr));
});
var server = app.listen(8080, function(req, res) {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Are you ready to Die?!:", host, port);
});
