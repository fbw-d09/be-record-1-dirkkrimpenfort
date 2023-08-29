//Aufgabe 01
const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.use (express.json());
//wird nur bei älteren Versionen von Express benötigt
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
const { connect, closeConnection } = require('./configs/db.js');
connect();


//Aufgabe 02-Middleware
const meineMiddleware = require('./middleware/corsMiddleware'); 
app.use(meineMiddleware);

//Aufgabe 01(Get und Post) und 03 -Routing
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

