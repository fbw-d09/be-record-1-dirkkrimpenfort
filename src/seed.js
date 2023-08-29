const mongoose = require('mongoose');
const User = require('./models/User');
const Record = require('./models/Record');
const Order = require('./models/Order');
const { connect } = require('./configs/db');

// Verbindung zur Datenbank herstellen
connect();

// Simulierte User-Daten
const userData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password',
  },
];

// Simulierte Record-Daten
const recordData = [
  {
    title: 'Album 1',
    artist: 'Artist 1',
    releaseYear: 2020,
    img: 'img1.jpg',
    price: 20,
    catalogNumber: 'CAT001',
  },
  {
    title: 'Album 2',
    artist: 'Artist 2',
    releaseYear: 2021,
    img: 'img2.jpg',
    price: 25,
    catalogNumber: 'CAT002',
  },
];

// Simulierte Order-Daten
const orderData = [
  {
    kunde: 'John Doe',
    record: 'Album 1',
    menge: 1,
  },
  {
    kunde: 'Jane Smith',
    record: 'Album 2',
    menge: 2,
  },
];

// Simulierte Daten in die Datenbank einfügen
const seedDatabase = async () => {
  try {
    // Simulierte User-Daten erstellen
    const users = await User.create(userData);

    // Simulierte Record-Daten erstellen
    const records = await Record.create(recordData);

    // Simulierte Order-Daten erstellen
    const orders = await Order.create(orderData);

    console.log('Simulationsdaten für Users erstellt:', users);
    console.log('Simulationsdaten für Records erstellt:', records);
    console.log('Simulationsdaten für Orders erstellt:', orders);
  } catch (error) {
    console.error('Fehler beim Erstellen der simulierten Daten:', error);
  } finally {
    mongoose.disconnect();
    console.log('Verbindung zur Datenbank geschlossen');
  }
};

seedDatabase();





