//Ladet die erste tabelle
table(false);

function table(bool) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//console.log(xmlhttp.responseText)
			var myArr = JSON.parse(xmlhttp.responseText);
			createTable(myArr, bool);
			if(!bool){
				document.getElementById("all").focus();
			}else{
				document.getElementById("active").focus();
			}
			
		}
	}
	xmlhttp.open("GET", "../json/db.json", true);
	xmlhttp.send();
	
	//console.log(xmlhttp.responseText)
}
function createTable(myArr, bool) {
	var out = templateTable();
	for(inhalt = 0; inhalt < myArr.length; inhalt++){
		if( !(bool && !myArr[inhalt].isFavorite) ){
		
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
		
