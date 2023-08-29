const {Schema, model} = require('mongoose');
const orderSchema = new Schema({
    kunde: String,
    record: String,
    menge: Number});

const orderModel = new model('Order', orderSchema, 'orders');
module.exports = orderModel;

