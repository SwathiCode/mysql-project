const express = require('express');
const router = express.Router();
const users = require('./User');


// Get all user
router.get('/', (req, res) => {
    users.getuser((err, user) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(user);
        }
    });
});




// Create a new user
router.post('/', (req, res) => {
    const usersData = req.body;
    users.createuser(usersData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating user' });
        } else {
            res.json({ message: 'user created successfully',data:result });
        }
    });
});

// Update a user
router.put('/:id', (req, res) => {
    const usersId = req.params.id;
    const usersData = req.body;
    users.updateuser(usersId, usersData, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating product' });
        } else {
            res.json({ message: 'Product updated successfully',data:result });
        }
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    const usersId = req.params.id;
    users.deleteuser(usersId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting product' });
        } else {
            res.json({ message: 'Product deleted successfully',data:result });
        }
    });
});

module.exports = router;
