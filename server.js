const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Turism-Site')));

const db = new sqlite3.Database('./database.db');

// Creează tabelele
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    destination TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
});

// API pentru înregistrare
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function(err) {
    if (err) return res.status(400).json({ error: 'Email deja existent' });
    res.json({ id: this.lastID });
  });
});

// API pentru login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credențiale invalide' });
    }
    res.json({ name: user.name, email: user.email });
  });
});

// API pentru salvare rezervare
app.post('/api/bookings', (req, res) => {
  const { name, email, destination, message, userEmail } = req.body;
  let userId = null;
  if (userEmail) {
    db.get('SELECT id FROM users WHERE email = ?', [userEmail], (err, user) => {
      userId = user ? user.id : null;
      insertBooking();
    });
  } else {
    insertBooking();
  }
  function insertBooking() {
    db.run('INSERT INTO bookings (user_id, name, email, destination, message) VALUES (?, ?, ?, ?, ?)', [userId, name, email, destination, message], function(err) {
      if (err) return res.status(500).json({ error: 'Eroare salvare' });
      res.json({ id: this.lastID });
    });
  }
});

// API pentru obținere rezervări
app.get('/api/bookings', (req, res) => {
  db.all('SELECT name, email, date, message, destination FROM bookings ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Eroare' });
    res.json(rows);
  });
});

app.listen(3000, () => console.log('Server pornit pe port 3000'));