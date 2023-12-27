const express = require('express');
const router = express.Router();
const category = require('./categories');


// Get all categories
router.get('/', (req, res) => {
    category.getcategories((err, categories) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(categories);
        }
    });
});



// Create a new categories
router.post('/', (req, res) => {
    const categoryData = req.body;
    category.createcategories(categoryData , (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating categories' });
        } else {
            res.json({ message: 'categories created successfully',data:result });
        }
    });
});


// Update a categories
router.put('/:id', (req, res) => {
    const  categoryId = req.params.id;
    const categoryData  = req.body;
    category.updatecategories( categoryId, categoryData , (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating categories' });
        } else {
            res.json({ message: 'categories updated successfully',data:result });
        }
    });
});

// Delete a categories
router.delete('/:id', (req, res) => {
    const categoryId = req.params.id;
    category.deletecategories( categoryId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully',data:result });
        }
    });
});

module.exports = router;
