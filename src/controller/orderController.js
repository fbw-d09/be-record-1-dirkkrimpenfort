const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../src/dbOrder.json'); 
const dbOrder = low(adapter);

exports.createOrder = (req,res) => {
    const newOrder = req.body;
    dbOrder.get('orders').push(newOrder).write();  
    console.log(newOrder)
    res.status(201).json(newOrder);
    console.log('neue Bestellung wurde erstellt', dbOrder.get('orders').value())  
};

exports.getOrders = (req,res) => {
    const orders = dbOrder.get('orders').value(); // Fügen Sie diese Zeile hinzu
    res.status(200).json(orders);
    console.log('Alle Bestellungen sind angezeigt');
};


exports.getOrderById = (req, res) => {
    const orderID = parseInt(req.params.id, 10); 
    const order = dbOrder.get('orders').find({ id: orderID }).value(); 
    if (!order) {
        res.status(404).send("Order not found");
    } else {
        res.status(200).json(order);
    }
};

exports.updateOrderById = (req, res) => {
    const orderID = parseInt(req.params.id, 10);  
    const updateOrderData = req.body;
    const order = dbOrder.get('orders').find({ id: orderID }).value(); 
    if (!order) {
        return res.status(404).send("Order not found");
    }
    dbOrder.get('orders').find({ id: orderID }).assign(updateOrderData).write();
    res.send(dbOrder.get('orders').find({ id: orderID }).value());
};

exports.deleteOrderById = (req, res) => {
    const orderID = parseInt(req.params.id, 10);  
    const order = dbOrder.get('orders').find({ id: orderID }).value(); 
    if (!order) {
        return res.status(404).send("Order not found");
    }
    dbOrder.get('orders').remove({ id: orderID }).write();

    res.status(200).send('Order deleted');
};

