// Sadrži sve elemente oko validacije obrasca

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

var inputs = document.querySelectorAll("input");
var textareas = document.querySelectorAll("textarea");
var selects = document.querySelectorAll("select");

function isFormEmpty(event){
    // dohvaćamo sve input, textarea i select elemente
    let isGood = true;
    poruka = "";
    
    for (let i = 1; i < inputs.length; i++) {
        if((inputs[i].type === "text" || inputs[i].type === "email") && inputs[i].value === ""){
            inputs[i].style.borderColor = "red";
            event.preventDefault();
            poruka = "Polje ne smije biti prazno";
            focusEmptyForm(poruka, inputs[i]);
            // izlazimo iz funkcije jer nema smisla provjeravati ostale elemente
            isGood = false;
            return isGood;
        }
        if(inputs[i].type === "number" && (inputs[i].value === "" || inputs[i].value < 1 || inputs[i].value > 100)){
            inputs[i].style.borderColor = "red";
            event.preventDefault();
            poruka = "Unesite broj između 1 i 100";
            focusEmptyForm(poruka, inputs[i]);
            isGood = false;
            return isGood;
        }
        
        if(inputs[i].type === "date"){
            let date = new Date();
            let date2 = new Date(inputs[i].value);
            // potrebno je pretvoriti date u cijeli broj jer se date.getTime() vraća u milisekundama
            let diff = Math.floor((date2.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            // provjeravamo je li datum najranije 2 dana u prošlosti i najkasnije 1 mjesec u prošlosti
            if(diff < -2 || diff > -30){
                inputs[i].style.borderColor = "red";
                event.preventDefault();
                poruka = "Datum mora biti najranije 2 dana u prošlosti i najkasnije 1 mjesec u prošlosti";
                focusEmptyForm(poruka, inputs[i]);
                isGood = false;
                return isGood;
            }
        }
    }
    for (let i = 0; i < textareas.length; i++) {
        if (textareas[i].value === "") {
            textareas[i].style.borderColor = "red";
            isGood = false;
        }
    }
    for (let i = 0; i < select.length; i++) {
        if (select[i].value === "") {
            select[i].style.borderColor = "red";
            isGood = false;
        }
    }
    if (isGood === false) {
        alert("Niste popunili sva polja");
        event.preventDefault();
        focusEmptyForm(poruka);
        // spriječavamo slanje forme
        
        return false;
    }
    else{
        return true;
    }
}

form.addEventListener("submit", (e) => isFormEmpty(e));

/* ---------------- DRUGI DIO ---------------- */

// dohvaćamo poziciju prvog praznog elementa relativnu na zaslon
function findElementLocation(element) {
    let top = 0;
    let left = 0;
    let currentElement = element;

    while (currentElement) {
        top += currentElement.offsetTop;
        left += currentElement.offsetLeft;
    }

    return { top, left };
}

function deleteAllModalMessages(){
    if(document.querySelector(".modalMessage") !== null){
        document.querySelector(".modalMessage").remove();
    }
}

function focusEmptyForm(message, element){
    deleteAllModalMessages();

        let emptyField = element;
        emptyField.focus();
        emptyField.style.border = "3px solid red";

        modalMessage = document.createElement("div");
        modalMessage.classList.add("modalMessage");
        modalMessage.style.top = findElementLocation(emptyField).top + "px";
        modalMessage.style.left = findElementLocation(emptyField).left + "px";
        modalMessage.innerHTML = "<p>" + message + "</p>";

        emptyField.parentNode.appendChild(modalMessage);

        modalMessage = "<div class='modalMessage'><p>Potrebno je odabrati opciju</p></div>";
        emptyField.innerHTML += modalMessage;
}

document.addEventListener("keydown", (e) => {
    deleteAllModalMessages();
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            inputs[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            textareas[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            selects[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
        }
    }
});
document.addEventListener("reset", (e) => {
    deleteAllModalMessages();
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            inputs[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            textareas[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            selects[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
        }
    }
});
form.addEventListener("change", (e) => {
    deleteAllModalMessages();
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            inputs[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            textareas[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
            selects[i].style.border = "1px solid rgba(0, 0, 0, 0.4)";
        }
    }
});
