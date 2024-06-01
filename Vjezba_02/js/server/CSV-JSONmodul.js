const ds = require('fs');

class CSVJSONmodul {
    constructor() {
        this.csvDatoteka = "resursi/izlozba.csv";
        this.jsonDatoteka = "resursi/izlozba.json";
    }

    kopirajJSONuCSV() {
        let podatci = ds.readFileSync(this.jsonDatoteka, "utf-8");
        let jsonPodatci = JSON.parse(podatci);
        let csvPodatci = "";
			for (let i = 0; i < jsonPodatci.length; i++) {
				const red = jsonPodatci[i];
				csvPodatci += "" + red.name + "#" + red.year + "#" + red.desc + "#" + red.top_speed + "#" + red.power + "\n";
			}
        ds.writeFileSync(this.csvDatoteka, csvPodatci);
    }

    prebaciCSVuJSON(redak) {
        let podatci = redak.split("#");
        return {
            id: podatci[0],
            naziv: podatci[1],
            autor: podatci[2],
            godina: podatci[3],
            opis: podatci[4]
        };
    }

    prebaciJSONuCSV(podatak) {
        return podatak.name + "#" + podatak.year + "#" + podatak.desc + "#" + podatak.top_speed + "#" + podatak.power + "\n";
    }
}