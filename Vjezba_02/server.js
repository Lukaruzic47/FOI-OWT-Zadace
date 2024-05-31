
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
    console.log(data);
}

server.get("/popis", (zahtjev, odgovor) => {
    const csvDatoteka = putanja + "/resursi/izlozba.csv";
	const jsonDatoteka = putanja + "/resursi/izlozba.json";

});

server.use((zahtjev, odgovor) => {
	odgovor.status(404); // stausni kod 404
	odgovor.send("Stranica nije pronaÄ‘ena!");
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});
