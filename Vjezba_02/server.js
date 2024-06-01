const dodajTablicu = require('./js/server/dajTablicu.js');

function dajPort(korime) {
    var os = require("os");
	const HOST = os.hostname();
	let port = null;
	if (HOST != "spider.foi.hr") {
        port = 12094;
	} else {
        const portovi = require('/var/www/OWT/2024/portovi.js');
		port = portovi[korime];
	}
	return port;
}

const port = dajPort("lruzic22");

const exp = require("constants");
const express = require('/usr/lib/node_modules/express');
const server = express();

const ds = require('fs');

const putanja = __dirname;

server.use(express.urlencoded({extended: true}));

server.get('/', (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + '/html/index.html');
});

server.use("/css", express.static(putanja + "/css"));
server.use("/jsk", express.static(putanja + "/js/klijent"));
server.use("/slike", express.static(putanja + "/resursi/slike"));
server.use("/ank", express.static(putanja + "/html/anketaMuzeja.html"));
server.use("/dok", express.static(putanja + "/html/dokumentacija.html"));
server.use("/gal", express.static(putanja + "/html/galerijaSlika.html"));
server.use("/inv", express.static(putanja + "/html/inventarMuzeja.html"));
server.use("/oau", express.static(putanja + "/html/oAutoru.html"));
server.use("/obr", express.static(putanja + "/html/obrazac.html"));
server.use("/vij", express.static(putanja + "/html/vijest.html"));

function displayData(data) {
	data.type("html");
	data.write("<!DOCTYPE html>");
	data.write("<html>");
	data.write("<body>");
	data.write("<h1>Popis eksponata</h1>");
	data.write("<form action='/popis' method='get'>");
	data.write("<button type='submit' value='true' name='Prikazi_popis'>Osvježi podatke</button>");
	data.write("</form>");
	data.write(dodajTablicu.dajTablicu());
	data.write("</body>");
	data.write("<script src='/jsk/lruzic22.js'></script>");
	data.write("</html>");
	data.end();
}

server.get("/popis", (zahtjev, odgovor) => {
    let csvDatoteka = putanja + "/resursi/izlozba.csv";
	let jsonDatoteka = putanja + "/resursi/izlozba.json";
	let jsonPodatci = "";
	// provjeravamo postoji li parametar "reset" u URL-u
	if (zahtjev.query["Prikazi_popis"] === "true") {
		ds.readFile(jsonDatoteka, "utf-8", (greska, podatci) => {
			if (greska) {
				odgovor.status(500);
				odgovor.send("Pogreška u čitanju datoteke!");
				console.log("radi");
				return;
			}
			jsonPodatci = JSON.parse(podatci);
			
			let csvPodatci = "";
			for (let i = 0; i < jsonPodatci.length; i++) {
				const red = jsonPodatci[i];
				csvPodatci += "" + red.name + "#" + red.year + "#" + red.desc + "#" + red.top_speed + "#" + red.power + "\n";
			}
			
				ds.writeFile(csvDatoteka, csvPodatci, "utf-8", (greska) => {
				if (greska) {
					odgovor.status(500);
					odgovor.send("Pogreška u zapisivanju datoteke!");
					return;
				}
					
				displayData(odgovor);
			});
		});
	}
	else{
		displayData(odgovor);
	}
});

server.get("/brisi", (zahtjev, odgovor) => {
	let urlParametar = zahtjev.query["nazivAutomobila"];

	if(urlParametar === undefined){
		odgovor.status(400);
		odgovor.send("Niste poslali parametar!");
		return;
	}

	let csvDatoteka = putanja + "/resursi/izlozba.csv";

	ds.readFile(csvDatoteka, "utf-8", (greska, podatci) => {
		if (greska) {
			odgovor.status(500);
			odgovor.send("Pogreška u čitanju datoteke!");
			return;
		}

		// potrebno je pronaći redak u kojem se nalazi vozilo koje se želi obrisati
		let redovi = podatci.split("\n");
		let noviPodatci = "";
		
		noviPodatci = redovi.filter(red => !red.includes(urlParametar)).join("\n");
		
		ds.writeFile(csvDatoteka, noviPodatci, "utf-8", (greska) => {
			if (greska) {
				odgovor.status(500);
				odgovor.send("Pogreška u zapisivanju datoteke!");
				return;
			}

			odgovor.redirect("/popis");
		});
	});

});

server.use((zahtjev, odgovor) => {
	odgovor.status(404); // stausni kod 404
	odgovor.send("Stranica nije pronađena!");
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});
