
//Ladet die erste tabelle
table(false);

function table(bool) {
	var adress ;
	if(!bool){
		adress =  "http://127.0.0.1:8080/AllPlayer";
	}else{
		adress =  "http://127.0.0.1:8080/Favorites";
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = JSON.parse(xmlhttp.responseText);
			createTable(myArr);
			if(!bool){
				document.getElementById("all").focus();
			}else{
				document.getElementById("active").focus();
			}		
		}
	}
	xmlhttp.open("GET", adress, true);
	xmlhttp.send();
	
}
function createTable(myArr) {
	var out = templateTable();
	for(inhalt = 0; inhalt < myArr.length; inhalt++){
		
			out += "<tr class='content'><td>" +
			myArr[inhalt].firstname +
			"</td><td>" +
			myArr[inhalt].team +
			"</td><td>" +
			myArr[inhalt].headcoach +
			"</td><td>" +
			myArr[inhalt].asisstantcoach +
			"</td><td>" +
			myArr[inhalt].position +
			"</td><td>" +
			myArr[inhalt].isActive +
			"</td><td>" +
			myArr[inhalt].number +
			"</td><td>" +
			myArr[inhalt].year +
			"</td></tr>";			
		
	}
	out += "</table>";
	document.getElementById("tabelle").innerHTML = out;
}				
			
function templateTable(){
	var out = "<table border class='templateTable'>"+
		"<tr  id='button'><th colspan='4'><input type='button' id='all'  value='Alle Spieler' onclick='table(false)'>" +
		"</th><th colspan='4'><input type='button' id='active'  value='Meine Favoriten' onclick='table(true)'>" +
		"<tr class ='tableHeadline'><th>" +
		"Spieler" +
		"</th><th>" +
		"Verein" +
		"</th><th>" +
		"Headcoach" +
		"</th><th>" +
		"Assistent" +
		"</th><th>" +
		"Position" +
		"</th><th>" +
		"Aktiv" +
		"</th><th>" +
		"Nummer" +
		"</th><th>" +
		"Jahr" +
		"</th></tr>";
	return out;
}
		
