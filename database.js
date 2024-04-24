const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) =>{
    if (err) {
        console.log(err.message);
    }
    console.log("Connessione al database riuscita");
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    db.run('INSERT INTO chatgram (email, password, username) VALUES (?, ?, ?)', [email, password, username], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Nuovo utente registrato con ID: ${this.lastID}`);
        res.send('Utente registrato con successo');
    });
});

app.listen(port, () => {
    console.log(`Server Express in ascolto su http://localhost:${port}`);
});
