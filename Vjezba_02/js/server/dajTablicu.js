const ds = require('fs');

exports.dajTablicu = function (){
	let data = ds.readFileSync("resursi/izlozba.csv", "utf-8");
	let tablica = "";

	var redovi = data.split("\n");
	tablica += "<table>";
	for(var red of redovi){
		var kolone = red.split("#");
        // provjera je li red prazan
        if (kolone[0] === "") {
            tablica += "</table>";
            return tablica;
        }
		tablica += "<tr><td>"+kolone[0]
					+"</td><td>"+kolone[1]
					+"</td><td>"+kolone[2]
					+"</td><td>"+kolone[3]
					+"</td><td>"+kolone[4]+"</td></tr>";
	}
	tablica += "</table>";
	
	return tablica;
}