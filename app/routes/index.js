const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const db = require('../config/db')


router.post('/api/yandex', async (req, res) => {
    const orders = await loadOrdersCollection();
    await orders.findOneAndReplace({"object.id" : req.body.object.id}, req.body,{upsert: true});
    res.status(200).send();
})
router.get('/api/orders', async (req, res) => {
    const orders = await loadOrdersCollection();
        res.send(await orders.find({}).toArray());
});
router.post('/api/paypal', async (req, res) => {
    const orders = await loadOrdersCollection();
    await orders.insertOne(req.body);
    res.status(200).send();
})


async function loadOrdersCollection() {
    const client = await MongoClient.connect(
        db.url,
        {
            useNewUrlParser: true
        }
    );
    return client.db('6og').collection('orders');
}

module.exports = router;