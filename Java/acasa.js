
window.onload = function () {

    let nume = prompt("Cum te numești?");

    if (nume != null && nume != "") {
        let h2 = document.querySelector("h2");
        h2.textContent = "Bine ai venit, " + nume + "!";
    }

};


window.addEventListener("scroll", function () {

    let header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.9)";
    } 
    else {
        header.style.background = "rgba(0,0,0,0.55)";
    }

});


document.addEventListener("DOMContentLoaded", function () {

    let buton = document.querySelector(".btn-hero");

    buton.addEventListener("click", function () {

    });

});