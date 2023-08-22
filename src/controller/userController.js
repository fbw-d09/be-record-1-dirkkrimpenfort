const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../src/dbUser.json'); 
const dbUser = low(adapter);

exports.createUser = (req,res) => {
    const newUser = req.body;
    dbUser.get('users').push(newUser).write();  
    console.log(newUser)
    res.status(201).json(newUser);
    console.log('neuer Nutzer wurde erstellt', dbUser.get('users').value())  
};

exports.getUsers = (req,res) => {
    res.status(200).json(users);
    console.log('Alle Nutzer sind angezeigt')
};

exports.getUserById = (req, res) => {
    const userID = parseInt(req.params.id, 10); 
    const user = dbUser.get('users').find({ id: userID }).value(); 
    if (!user) {
        res.status(404).send("User not found");
    } else {
        res.status(200).json(user);
    }
};

exports.updateUserById = (req, res) => {
    const userID = parseInt(req.params.id, 10);  
    const updateUserData = req.body;
    const user = dbUser.get('users').find({ id: userID }).value(); 
    if (!user) {
        return res.status(404).send("User not found");
    }
    dbUser.get('users').find({ id: userID }).assign(updateUserData).write();
    res.send(dbUser.get('users').find({ id: userID }).value());
};

exports.deleteUserById = (req, res) => {
    const userID = parseInt(req.params.id, 10);  
    const user = dbUser.get('users').find({ id: userID }).value(); 
    if (!user) {
        return res.status(404).send("User not found");
    }
    dbUser.get('users').remove({ id: userID }).write();

    res.status(200).send('User deleted');
};

