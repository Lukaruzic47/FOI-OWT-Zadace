// sadrži gumb koji prebacuje stranicu na mobilnu verziju
// nakon toga gumb sadrži tekst "Povratak na desktop verziju"
// informacija o "verziji uređaja" se na klik sprema u kolačić i učitava se prilikom učitavanja stranice
// te se stranica odmah prikazuje u tom obliku i gumb ima ispravan tekst

/* ---------------- PRVI DIO ---------------- */
// sadrži gumb koji prebacuje stranicu na mobilnu verziju

mobileDesktopButton = document.getElementById("switchDesktopMobile");
mobileDesktopButton.addEventListener("click", function () {
	requestDesktopSite(getCookie("device"));
});

function requestDesktopSite(argument) {
	// ako je argument jednak trenutnom stanju, ne radi ništa
	let cssPath = document.getElementById("mobile-css");

    if(argument === "onload"){
        mobileDesktopButton.innerHTML = "Prebaci na desktop verziju";
        cssPath.type = "text/css";
		cssPath.href = "../css/mobile-view.css";
        console.log("postavljeno na mobilnu verziju");
		return;
    }
	if (argument === "mobile") {
		setCookie("device", "desktop", 30);
		mobileDesktopButton.innerHTML = "Prebaci na mobilnu verziju";
		cssPath.href = " ";
		console.log(getCookie("device"));
		return;
	}
	if (argument === "desktop") {
		mobileDesktopButton.innerHTML = "Prebaci na desktop verziju";
		cssPath.type = "text/css";
		cssPath.href = "../css/mobile-view.css";
		setCookie("device", "mobile", 30);
		console.log(getCookie("device"));
		return;
	}
}

/* ---------------- DRUGI DIO ---------------- */
// rad s kolačićima koji pamte informaciju o "verziji uređaja"

function setCookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	// postavljanje vremena isteka kolačića d.getTime() -> trenutno vrijeme
	// exdays*24*60*60*1000 -> broj dana * 24 sata * 60 minuta * 60 sekundi * 1000 milisekundi -> vrijeme u budućnosti
	// d.setTime -> postavlja tu vrijednost kada će kolačić isteći
	let expires = "expires=" + d.toUTCString();
	document.cookie =
		cname + "=" + cvalue + ";" + expires + "; SameSite=Strict; path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let device = getCookie("device");
	if (!device) {
		// kolačić ne postoji
		setCookie("device", "desktop", 365);
	} else {
		// kolačić postoji
		if (device === "mobile") {
			requestDesktopSite("onload");
		}
	}
}

document.addEventListener("DOMContentLoaded", checkCookie);
console.log(getCookie("device"));
