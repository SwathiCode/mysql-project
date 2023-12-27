const express = require('express');
const router = express.Router();
const Orderitem = require('./Orderitems');


// Get all Orderitems
router.get('/', (req, res) => {
    Orderitem.getorderitems((err, orders) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(orders);
        }
    });
});



// Create a new Orderitems
router.post('/', (req, res) => {
    const  OrderitemData = req.body;
    console.log(OrderitemData);
    Orderitem.createorderitems( OrderitemData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating orderitems' });
        } else {
            OrderitemData["result"]=result;

            res.json({ message: 'items created successfully',data:result });
        }
    });
});

// Update a Orderitems
router.put('/:id', (req, res) => {
    const OrderitemId = req.params.id;
    const  OrderitemData = req.body;
    Orderitem.updateorderitems(OrderitemId,  OrderitemData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});

// Delete aOrderitems
router.delete('/:id', (req, res) => {
    const OrderitemId = req.params.id;
    Orderitem.deleteorderitems(OrderitemId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully',data:result });
        }
    });
});

module.exports = router;
