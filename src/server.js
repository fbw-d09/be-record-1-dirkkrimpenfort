const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const meineMiddleware = require('./middleware/corsMiddleware'); 

const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(meineMiddleware);

db.defaults({ records: [] }).write();
app.use (express.json());

app.get('/api/records', (req, res) => {
    const records = db.get('records').value();
    res.json(records);
    res.status(200).send("Hallo Welt!");
});

app.post('/api/records', (req, res) => {
    const newRecord = req.body;
    db.get('records').push(newRecord).write();
    res.json(newRecord);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//Test Datenbank
/* const read = () =>
{  
    const allRecords = db.get("records").value();
    console.log(allRecords);
};
read(); */

const create = ({ id, title, artist,  releaseYear, img, price }) =>
{
    // wir erstellen also ein objekt mit den gewünschten werten:
    const newRecords = {
        id, 
        title, 
        artist, 
        releaseYear, 
        img,
        price
    };

    // wir führen die funktion create aus, und sehen den neuen eintrag in der db.json datei, und in der konsole:
// create({
//     id: 4,
//     brand: "Ford",
//     name: "Puma",
//     type: "suv",
//     year: 2023
// });

    // wir holen uns die kollektion "cars" mit der methode .get(); und pushen das neue objekt dort hinein, am ende nutzen wir die methode .write(); um die daten in die datenbank zu schreiben:
    db.get("records").push(newRecords).write();

    // damit wir sicher gehen können, das alles geklappt hat, auch ohne das wir die datenbankdatei offen hätten, können wir ausserdem eine meldung in der konsole ausgeben:
    console.log("Eintrag erstellt:", newRecords);
}


