const dbCon = require('./config/dbCon');

// Create a categories
function createcategories(categoryData, callback) {
    const { name, category_id} = categoryData;
    const query = 'INSERT INTO categories (name, category_id) VALUES (?, ?)';
    dbCon.query(query, [name, category_id], (err, result) => {
        if (err) {
            console.log(err);

            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
}

// Read categories
function getcategories(callback) {
    const query = "SELECT * FROM categories";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// Update a categories
function updatecategories(category_id, categoryData, callback) {
    const { name } = categoryData;
    const query = "UPDATE categories SET name =?  WHERE category_id = ?";
    dbCon.query(query, [name,category_id], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

// Delete a categories
function deletecategories(categoryId, callback) {
    const query = 'DELETE FROM categories where category_id = ?';
    dbCon.query(query, [categoryId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createcategories,
    getcategories,
    updatecategories,
    deletecategories
};
