
function validateContactEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validateMessage(mesaj) {
    return mesaj.trim().length >= 10;
}


function countContactsByDestination(destinatie) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    return contacts.filter(c => c.destinatie === destinatie).length;
}

function showContactStatistics() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
    if (contacts.length === 0) {
        alert("Nu ai trimis niciun mesaj încă!");
        return;
    }

    let stats = "📊 STATISTICI CONTACTE:\n\n";
    stats += "Total mesaje: " + contacts.length + "\n\n";

    let destinations = {};
    contacts.forEach(c => {
        destinations[c.destinatie] = (destinations[c.destinatie] || 0) + 1;
    });

    stats += "Mesaje per destinație:\n";
    for (let dest in destinations) {
        stats += "- " + dest + ": " + destinations[dest] + "\n";
    }

    let lastContact = contacts[contacts.length - 1];
    stats += "\nUltimul mesaj trimis: " + lastContact.data;

    alert(stats);
}


function showRecentContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
    if (contacts.length === 0) {
        alert("Nu ai trimis niciun mesaj");
        return;
    }



    
    let recentList = "📝 ULTIMELE 5 CONTACTE:\n\n";
    let recent = contacts.slice(-5).reverse();
    
    recent.forEach((c, index) => {
        recentList += (index + 1) + ". " + c.name + " → " + c.destinatie + "\n";
        recentList += "   Data: " + c.data + "\n";
        recentList += "   Mesaj: " + c.mesaj.substring(0, 40) + (c.mesaj.length > 40 ? "..." : "") + "\n\n";
    });

    alert(recentList);
}


function clearAllContacts() {
    if (confirm("Ești sigur că vrei să ștergi TOATE mesajele? Aceasta nu se poate anula!")) {
        localStorage.removeItem("contacts");
        alert("Toate mesajele au fost șterse!");
    }
}


function exportContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
    if (contacts.length === 0) {
        alert("Nu ai contacte de exportat");
        return;
    }

    let text = "=== EXPORT CONTACTE TRAVELGO ===\n";
    text += "Data export: " + new Date().toLocaleString("ro-RO") + "\n\n";

    contacts.forEach((c, index) => {
        text += "--- CONTACT " + (index + 1) + " ---\n";
        text += "Nume: " + c.name + "\n";
        text += "Email: " + c.email + "\n";
        text += "Destinație: " + c.destinatie + "\n";
        text += "Data: " + c.data + "\n";
        text += "Mesaj:\n" + c.mesaj + "\n\n";
    });

    
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", "contacte_travelgo.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert("Contactele au fost exportate cu succes!");
}


function searchContacts(keyword) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let results = contacts.filter(c => 
        c.name.toLowerCase().includes(keyword.toLowerCase()) || 
        c.email.toLowerCase().includes(keyword.toLowerCase())
    );

    if (results.length === 0) {
        alert("Nu s-au găsit contacte cu '" + keyword + "'");
        return;
    }

    let searchResults = "🔍 REZULTATE CĂUTARE: " + keyword + "\n\n";
    results.forEach(c => {
        searchResults += "- " + c.name + " (" + c.email + ")\n";
        searchResults += "  Destinație: " + c.destinatie + "\n";
        searchResults += "  Data: " + c.data + "\n\n";
    });

    alert(searchResults);
}


function toggleFavorite(contactIndex) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let favorites = JSON.parse(localStorage.getItem("favoriteContacts")) || [];

    if (favorites.includes(contactIndex)) {
        favorites = favorites.filter(i => i !== contactIndex);
        alert("Contactul a fost șters din favorite!");
    } else {
        favorites.push(contactIndex);
        alert("Contactul a fost adăugat la favorite! ⭐");
    }

    localStorage.setItem("favoriteContacts", JSON.stringify(favorites));
}


function showFavoriteContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let favorites = JSON.parse(localStorage.getItem("favoriteContacts")) || [];

    if (favorites.length === 0) {
        alert("Nu ai contacte favorite");
        return;
    }

    let favList = "⭐ CONTACTELE TALE PREFERATE:\n\n";
    favorites.forEach(idx => {
        if (contacts[idx]) {
            let c = contacts[idx];
            favList += "- " + c.name + " → " + c.destinatie + "\n";
            favList += "  Email: " + c.email + "\n";
            favList += "  Data: " + c.data + "\n\n";
        }
    });

    alert(favList);
}
