var regZahlen = /[^0-9]+/; // Testet ob es nicht alles zahlen sind
var regBuchstaben = /[^a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+/; // Testet
																			// ob
																			// es
																			// nicht
																			// alles
																			// buchstaben
																			// sind
var focus = true; // Merkt sich ob fokus gesetzt wurde(checkt auch ob fehler
					// vorhanden war)
var bgColor = "solid red 1px";

function sendExpress() {

	if (validationInput()) {

		var active = document.getElementById("ac_id").value;
		var favo = document.getElementById("favo_id").value;

		$.ajax({
			url : 'http://127.0.0.1:8080/Player',
			type : 'PUT',
			contentType : 'application/json',
			data : JSON.stringify({
				"isActive" : active,
				"IsFavorite" : favo,
				"year" : document.getElementById("jahr_id").value,
				"number" : document.getElementById("number_id").value,
				"firstname" : document.getElementById("name_id").value,
				"surname" : document.getElementById("vorname_id").value,
				"headcoach" : document.getElementById("hcoach_id").value,
				"asisstantcoach" : document.getElementById("acoach_id").value,
				"team" : document.getElementById("verein_id").value,
				"position" : document.getElementById("pos_id").value
			})
		});

			//document.location.href = "http://127.0.0.1:8080/";
			alert("Versendet");
	}

}
function popUp() {
	alert("Einige Eingaben sind fehlerhaft. Bitte \u00dcberpr\u00fcfen Sie ihre Eingaben");
}

/*
 * Pr�ft ob im value reg enthaltene informationen sind entity ist vom typ
 * document.EntryForm.[Typname] Wenn es ok ist, wird true zur�ckgegeben
 */
function checkInput(entity, reg) {
	// pr�ft ob es (nicht)leer ist
	if (entity.value.length <= 0 || entity.value.match(reg)) {
		entity.style.border = bgColor;
		if (focus == false) {
			entity.focus();
			focus = true;
		}
		return false;
	} else {
		return true;
	}
}
function checkInputNumber(entity, reg, min, max) {
	if (checkInput(entity, reg)) {
		if (entity.value > max || entity.value < min) {
			entity.style.border = bgColor;
			if (focus == false) {
				entity.focus();
				focus = true;
			}
			return false;
		} else {
			return true;
		}
	}
}
/* Versetzt die grundfarbe der eingabefelder weiss */
function init() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].style.border = "white";
	}
}
/* Checkt die Validierung */
function validationInput() {
	focus = false;

	var name = document.getElementById("name_id");
	var vorname = document.getElementById("vorname_id");
	var verein = document.getElementById("verein_id");
	var hcoach = document.getElementById("hcoach_id");
	var acoach = document.getElementById("acoach_id");

	var number = document.getElementById("number_id");
	var jahr = document.getElementById("jahr_id");

	init(name, vorname, verein, hcoach, acoach, number, jahr);

	checkInput(name, regBuchstaben);
	checkInput(vorname, regBuchstaben);
	checkInput(verein, regBuchstaben);
	checkInput(hcoach, regBuchstaben);
	checkInput(acoach, regBuchstaben);

	checkInputNumber(number, regZahlen, 4, 15);
	checkInputNumber(jahr, regZahlen, 0, 2015);

	/*
	 * Falls erwas fokusiert wird, wird eine fehlermeldung ausgeben und false
	 * zur�ckgegeben
	 */
	if (focus == true) {
		popUp();
		return false;
	} else {
		return true;
	}
}
