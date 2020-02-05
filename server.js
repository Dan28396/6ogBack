const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db')
const fs = require('fs');
const https = require('https');
const subdomain = require('express-subdomain');
const router = express.Router();
const port = 3000;

app.use(subdomain('api', router));


app.use(bodyParser({extended: true}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    const db = database.db("6og")
    require('./app/routes')(app, db);
    https.createServer({
        key: fs.readFileSync('./encryption/private.key'),
        cert: fs.readFileSync( './encryption/certificate.crt' ),
        ca: fs.readFileSync( './encryption/certificate_ca.crt' )
    }, app)
        .listen(3000, function () {
            console.log('Example app listening on port 3000! Go to https://localhost:3000/')
        })
})