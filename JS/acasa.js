
console.log("acasa.js încărcat");

function initWelcome() {
   
    const path = window.location.pathname;
    if (!path.endsWith("index.html") && path !== "/" && path !== "/index.html") {
        return; 
    }

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        user = { name: "Vizitator", email: "" };
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    let nameInput = prompt("Cum te numești?");
    if (nameInput && nameInput.trim() !== "") {
        user.name = nameInput.trim();
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log("Bine ai venit, " + user.name + "!");
    } else {
        console.log("Introdu un nume!");
    }

    let h2 = document.querySelector(".hero h2");
    if (h2) {
        h2.textContent = "Bine ai venit, " + user.name + "!";
    }
}

window.addEventListener("load", initWelcome);