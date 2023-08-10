const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const port = 3000;

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ records: [] }).write();
app.use (express.json());

app.get('/api/records', (req, res) => {
    const records = db.get('records').value();
    res.json(records);
});

app.post('/api/records', (req, res) => {
    const newRecord = req.body;
    db.get('records').push(newRecord).write();
    res.json(newRecord);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const read = () =>
{
    //  mit .get(); und .value(); bekommen wir die werte aller einträge zurück:
    const allRecords = db.get("records").value();

    console.log(allRecords);
};

// wir führen die funktion read(); aus, und sehen alle einträge im terminal:
read();