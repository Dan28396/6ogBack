module.exports = function (app, db) {
    app.route('/orders')
        .post(function (req, res) {
            const order = {
                metadata: req.body.metadata.order,
                description: req.body.description,
                status: req.body.status,
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
