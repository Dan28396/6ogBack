const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db')
const fs = require('fs');
const https = require('https');


const port = 3000;
app.use(bodyParser({extended: true}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    const db = database.db("6og")
    require('./app/routes')(app, db);
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app)
        .listen(3000, function () {
            console.log('Example app listening on port 3000! Go to https://localhost:3000/')
        })
})