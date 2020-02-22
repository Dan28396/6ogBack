const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const db = require('../config/db')
const cors = require('cors')


router.post('/api/yandex', async (req, res) => {
    const orders = await loadOrdersCollection();
    await orders.findOneAndReplace({"id": req.body.object.id},
        {
            "id": req.body.object.id,
            "status": req.body.object.status,
            "created_at": req.body.object.created_at,
            "country": req.body.object.metadata.country,
            "address": req.body.object.metadata.address,
            "city": req.body.object.metadata.city,
            "postalCode": req.body.object.metadata.postalCode,
            "name": req.body.object.metadata.name,
            "email": req.body.object.metadata.email,
            "phone": req.body.object.metadata.phone,
            "order": JSON.parse(req.body.object.metadata.order),
            "source": "yandex",
            "isVisible": false
        }, {upsert: true});
    res.status(200).send();
})

let corsOptions = {
    origin: 'https://www.6og.ooo',
}

router.get('/api/orders', cors(corsOptions), async (req, res) => {
    const orders = await loadOrdersCollection();
    res.send(await orders.find({}).toArray());
});
router.post('/api/paypal', async (req, res) => {
    const orders = await loadOrdersCollection();
    let description = req.body.order.purchase_units[0].description.split(';');
    let name = description[0];
    let email = description[1];
    let phone = description[2];
    await orders.insertOne({
            "id": req.body.order.id,
            "status": req.body.order.status,
            "created_at": req.body.order.create_time,
            "country": req.body.order.purchase_units[0].shipping.address.country_code,
            "address": req.body.order.purchase_units[0].shipping.address.address_line_1,
            "city": req.body.order.purchase_units[0].shipping.address.admin_area_2,
            "postalCode": req.body.order.purchase_units[0].shipping.address.postal_code,
            "name": name,
            "email": email,
            "phone": phone,
            "order": req.body.order.purchase_units[0].items,
            "source": "paypal",
            "isVisible": false
        }
    );
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