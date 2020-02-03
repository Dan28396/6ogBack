module.exports = function (app, db) {
    app.route('/orders')
        .post(function (req, res) {
            const order = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                region: req.body.region,
                zip: req.body.zip,
                items: req.body.items
            };
            db.collection('orders').insert(order, (err, result) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.send(result.ops[0]);
                }
            });
        })
        .get(function (req, res) {
            db.collection('orders').find({}).toArray(function(error, orders) {
                if (error) throw error;
                res.send(orders);
            });
        });
};
