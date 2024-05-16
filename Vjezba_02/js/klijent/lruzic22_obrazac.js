// Sadrži sve elemente oko validacije obrasca

// + Cijela forma mora biti popunjena prije slanja
// + Na pritisak gumba za slanje javlja pogrešku ako nisu svi podatci ispunjeni

// Poruka se javlja kod elementa koji nije ispunjen
// + label elementi polja koji nisu ispunjeni dobivaju crvenu boju

// kod datuma nemože se odabrati datum najranije 2 dana u prošlosti i najkasnije 1 mjesec u prošlosti

// kod padajućeg izbornika traži se obavezno odabir barem jedne opcije iz svake grupe opcija

// kod numeričkog polja traži se unos broja između 1 i 100

// kod textarea koristeći regex treba se provjeriti sljedeće: prvo slovo svake rečenice mora biti veliko, a zadnji znak mora biti točka
// U tekstu se mogu nalaziti max 4 rečenice, svaka mora započeti velikim slovom i završavati točkom, upitnikom ili uskličnikom
// zabranjeni su specijalni znakovi (<,>,#,-)

/* ---------------- PRVI DIO ---------------- */

// funkcija koja provjerava je li forma popunjena

form = document.getElementsByTagName("form");
form = form[0];
// dohvati gumb koji u sebi ima atribut type="submit"

var emptyFields = [];

function isFormEmpty(){
    emptyFields = [];
    // dohvaćamo sve input, textarea i select elemente
    let inputs = document.querySelectorAll("input");
    let textareas = document.querySelectorAll("textarea");
    let select = document.querySelectorAll("select");

    let isGood = true;
    let counter = 0;

    for (let i = 1; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            inputs[i].style.borderColor = "red";
            counter++;
            console.log(inputs[i]);
            emptyFields.push(inputs[i]);
            isGood = false;
        }
    }
    for (let i = 0; i < textareas.length; i++) {
        if (textareas[i].value === "") {
            textareas[i].style.borderColor = "red";
            counter++;
            emptyFields.push(textareas[i]);
            console.log(textareas[i]);
            isGood = false;
        }
    }
    for (let i = 0; i < select.length; i++) {
        if (select[i].value === "") {
            select[i].style.borderColor = "red";
            emptyFields.push(select[i]);
            counter++;
            console.log(select[i]);
            isGood = false;
        }
    }
    console.log(counter);
    console.log(isGood);
    if (!isGood) {
        alert("Niste popunili sva polja");
        return false;
    }
    else{
        return true;
    }
}

form.addEventListener("submit", (e) => {
    if(isFormEmpty()){
        console.log("Forma je popunjena");
    }
    else{
        e.preventDefault();
        focusEmptyForm();
        console.log(emptyFields);
        console.log("Niste popunili sva polja");
    }
});



/* ---------------- DRUGI DIO ---------------- */

// Dohvaćamo element koji je prazan i postavljamo element s porukom kod njega

function focusEmptyForm(){
    if(emptyFields.length > 0){
        emptyFields[0].focus();
        emptyFields[0].style.border = "3px solid red";
        // provjera je li prazan element u emptyFields tipa input, textarea ili select
        if(emptyFields[0].tagName === "INPUT" || emptyFields[0].tagName === "TEXTAREA"){
            modalMessage = "<div class='modalMessage'><p>Potrebno je popuniti ovo polje</p></div>";
            emptyFields[0].innerHTML += modalMessage;
            console.log("Ovo je input ili textarea");
        }
        else if(emptyFields[0].tagName === "SELECT"){
            modalMessage = "<div class='modalMessage'><p>Potrebno je odabrati opciju</p></div>";
            emptyFields[0].innerHTML += modalMessage;
            console.log("Ovo je select");
        }
    }
}

// provjeravamo prazne elemente onchange te im uklanjamo crvenu boju ako su popunjeni

form.addEventListener("change", (e) => {
    if(e.target.value !== ""){
        e.target.style.border = "1px solid rgba(0, 0, 0, 0.4)";
    }
});
