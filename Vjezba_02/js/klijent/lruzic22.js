// sadrži gumb koji prebacuje stranicu na mobilnu verziju
// nakon toga gumb sadrži tekst "Povratak na desktop verziju"
// informacija o "verziji uređaja" se na klik sprema u kolačić i učitava se prilikom učitavanja stranice
// te se stranica odmah prikazuje u tom obliku i gumb ima ispravan tekst

/* ---------------- PRVI DIO ---------------- */
// sadrži gumb koji prebacuje stranicu na mobilnu verziju

document.getElementById("switchDesktopMobile").addEventListener("click", function () {
    requestDesktopSite();
    console.log("Kliknuto na gumb za prebacivanje na mobilnu verziju");
  });

function requestDesktopSite() {
    console.log("Switching to mobile view");
    if (
        document.querySelector('meta[name="viewport"]').content === "width=1440px"
    ) {
        document.querySelector('meta[name="viewport"]').content = "width=400px";
    } else {
        document.querySelector('meta[name="viewport"]').content = "width=1440px";
    }
}

// funckija za dohvaćanje verzije uređaja

function getDeviceVersion() {
    if (document.querySelector('meta[name="viewport"]').content === "width=1440px") {
        return "desktop";
    } else {
        return "mobile";
    }
}