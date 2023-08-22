//Aufgabe 01
const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.use (express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/records', (req, res) => {
    const records = db.get('records').value();
    //res.json(records);
    res.status(200).send("Hallo Welt!");
});

app.post('/api/records', (req, res) => {
    const newRecord = req.body;
    db.get('records').push(newRecord).write();
    res.status(201).send("Record added");
});

//Aufgabe 02-Middleware
const meineMiddleware = require('./middleware/corsMiddleware'); 
app.use(meineMiddleware);

//Aufgabe 03-Routing
const recordsRouter = require('./routes/recordsRouter');
app.use('/api/records', recordsRouter);

const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

const ordersRouter = require('./routes/ordersRouter');
app.use('/api/orders', ordersRouter);

//Ende Routing


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

