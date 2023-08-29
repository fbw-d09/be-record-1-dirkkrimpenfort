const {Schema, model} = require('mongoose');
const recordSchema = new Schema({
    title: String,
    artist: String,
    releaseYear: Number,
    img: String,
    price: Number,
    catalogNumber: String});
    const recordModel = new model('Record', recordSchema, 'records');
    module.exports = recordModel;

    


