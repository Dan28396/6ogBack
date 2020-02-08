const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db')
const cors = require('cors');



const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());



MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    const db = database.db("6og")
    const orders = require('./app/routes/index');
    app.use('/api/orders', orders);
    app.listen(port, function () {
            console.log('Listening on port ' + port + '! Go to https://localhost:' + port + '/')
        })
})

