const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../src/db.json'); 
const db = low(adapter);

exports.createRecord = (req,res) => {
    const newRecord = req.body;
    db.get('records').push(newRecord).write();
    res.status(201).send("Record added");
};

exports.getRecords = (req,res) => {
    const records = db.get('records').value(); // Fügen Sie diese Zeile hinzu
    res.status(200).json(records);
    console.log('Alle Records sind angezeigt');
};

exports.getRecordById = (req, res) => {
    const recordID = parseInt(req.params.id, 10); 
    const record = db.get('records').find({ id: recordID }).value(); 
    if (!record) {
        res.status(404).send("Record not found");
    } else {
        res.status(200).json(record);
    }
};

exports.updateRecordById = (req, res) => {
    const recordID = parseInt(req.params.id, 10);  
    const updateRecordData = req.body;
    const record = db.get('records').find({ id: recordID }).value(); 
    if (!record) {
        return res.status(404).send("Record not found");
    }
    db.get('records').find({ id: recordID }).assign(updateRecordData).write();
    res.send(db.get('records').find({ id: recordID }).value());
};

exports.deleteRecordById = (req, res) => {
    const recordID = parseInt(req.params.id, 10);  
    const record = db.get('records').find({ id: recordID }).value(); 
    if (!record) {
        return res.status(404).send("Record not found");
    }
    db.get('records').remove({ id: recordID }).write();

    res.status(200).send('Record deleted');
};


