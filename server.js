const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db')


const port = 3000;
app.use(bodyParser({extended: true}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    const db = database.db("6og")
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})