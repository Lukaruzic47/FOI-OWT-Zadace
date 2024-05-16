// sadrži gumb koji prebacuje stranicu na mobilnu verziju
// nakon toga gumb sadrži tekst "Povratak na desktop verziju"
// informacija o "verziji uređaja" se na klik sprema u kolačić i učitava se prilikom učitavanja stranice
// te se stranica odmah prikazuje u tom obliku i gumb ima ispravan tekst

/* ---------------- PRVI DIO ---------------- */
// sadrži gumb koji prebacuje stranicu na mobilnu verziju

mobileDesktopButton = document.getElementById("switchDesktopMobile");
mobileDesktopButton.addEventListener("click", function () {
    requestDesktopSite();
});

var toggle = 0;
function requestDesktopSite() {
    let cssPath = document.getElementById("mobile-css");
    if(!toggle){
        mobileDesktopButton.value = da;
        cssPath.type = 'text/css';
        cssPath.href = '../css/mobile-view.css';
        toggle = 1;
        console.log(toggle);
        return;
    }
    if(toggle){
        
        toggle = 0
        cssPath.type = 'text/css';
        cssPath.href = '../css/mobile-view';
        console.log(toggle);
        return;
    }

}