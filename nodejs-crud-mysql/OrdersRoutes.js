const express = require('express');
const router = express.Router();
const order = require('./Orders');
const { createorderitems } = require('./Orderitems');


// Get all orders
router.get('/', (req, res) => {
    order.getorders((err, Orders) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(Orders);
        }
    });
});



// Create a new orders
router.post('/', (req, res) => {
    const orderData = req.body;
    console.log(orderData);
    order.createorders(orderData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating orders' });
        } else {

            //create order items
            orderData["result"]=result;
            createorderitems(orderData,result)
            res.json({ message: 'orders created successfully',data:result });
        }
    });
});

// Update a orders
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;
    order.updateorders(orderId, orderData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});

// Delete a orders
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    order.deleteorders(orderId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product',data:result });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    });
});

module.exports = router;
