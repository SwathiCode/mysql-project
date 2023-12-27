const express = require('express');
const router = express.Router();
const product = require('./products');


// Get all products
router.get('/', (req, res) => {
    
    product.getProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(products);
        }
    });
});
router.get('/:id', (req, res) => {
    const category_id = req.params.id;
    const productData = req.body;
    product.getProductsbycategoryid(category_id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});



// Create a new product
router.post('/', (req, res) => {
    const productData = req.body;
    product.createProduct(productData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed TO Insert' });
        } else {
            res.json({ message: ' created successfully',data:result  });
        }
    });
});

router.post('/postfilter', (req, res) => {
    const filterData = req.body;
    product.getfiltersData(filterData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed TO Insert' });
        } else {
            res.json({ message: 'Retrieved successfully ',data:result  });
        }
    });
});

// Update a product
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    
    product.updateProduct(productId, productData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });


        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});

// Delete a product
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    product.deleteProduct(productId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully',data:result });
        }
    });
});





module.exports = router;
