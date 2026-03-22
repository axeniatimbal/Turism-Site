console.log("map.js loaded");

const map = L.map("map").setView([48.8566, 2.3522], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);


const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});


const defaultIcon = new L.Icon.Default();


const locations = [
    {name:'Paris', coords:[48.8566, 2.3522], image:'Paris.jpg', price:'600 €', details:'5 zile / 4 nopți'},
    {name:'Japonia', coords:[35.6762, 139.6503], image:'Japonia.jpg', price:'890 €', details:'4 zile / 3 nopți'},
    {name:'Roma', coords:[41.9028, 12.4964], image:'Roma.jpg', price:'550 €', details:'4 zile / 3 nopți'},
    {name:'Dubai', coords:[25.2048, 55.2708], image:'Dubai.jpg', price:'1200 €', details:'7 zile / 6 nopți'}
];


let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

let currentUser = JSON.parse(localStorage.getItem("currentUser"));


locations.forEach(loc => {

    let userReserved = reservations.find(r => 
        r.email === currentUser?.email && r.destinatie === loc.name
    );

    let totalReservations = reservations.filter(r => 
        r.destinatie === loc.name
    ).length;


    const html = `
    <div style="text-align:center">

        <strong>${loc.name}</strong><br>

        <img src="images/${loc.image}" 
        style="width:120px;margin:8px 0;"><br>

        ${loc.details}<br>
        ${loc.price}<br><br>

        Rezervări: <b>${totalReservations}</b><br><br>

        <button onclick="reserveDestination('${loc.name}')">
        Rezervă vacanța
        </button>

    </div>
    `;

    L.marker(loc.coords,{
        icon: userReserved ? redIcon : defaultIcon
    })
    .addTo(map)
    .bindPopup(html);

});


function reserveDestination(destinatie){

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user){
        alert("Trebuie să fii logat pentru a face rezervare!");
        return;
    }

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    let alreadyReserved = reservations.find(r => 
        r.email === user.email && r.destinatie === destinatie
    );

    if(alreadyReserved){
        alert("Ai rezervat deja această destinație!");
        return;
    }

    reservations.push({
        name:user.name,
        email:user.email,
        destinatie:destinatie,
        data:new Date().toLocaleString("ro-RO")
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Vacanță rezervată cu succes!");

    location.reload();
}