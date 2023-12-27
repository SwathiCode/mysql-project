const express = require('express');
const router = express.Router();
const country = require('./Countries');


// Get all countries
router.get('/', (req, res) => {
    country.getcountries((err, countries) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products',data:result });
        } else {
            res.json(countries);
        }
    });
});




// Create a new countries
router.post('/', (req, res) => {
    const countryData = req.body;
    country.createcountries(countryData , (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating countries' });
        } else {
            res.json({ message: 'countries created successfully',data:result });
        }
    });
});

// Update a countries
router.put('/:id', (req, res) => {
    const countryId = req.params.id;
    const countryData = req.body;
    country.updatecountries(countryId , countryData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});

// Delete a countries
router.delete('/:id', (req, res) => {
    const countryId  = req.params.id;
    country. deletecountries(countryId , (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully',data:result });
        }
    });
});

module.exports = router;
