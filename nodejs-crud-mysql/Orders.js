const dbCon = require('./config/dbCon');

// Create a orders
function createorders(ordersData, callback) {
    ordersData["orderDate"]=new Date();
    ordersData["city"]=ordersData.address;
    const {  city, orderDate,totalprice} =ordersData;
    
    const query = 'INSERT INTO orders (city, orderDate,totalprice) VALUES (?,?,?)';
    dbCon.query(query, [city, orderDate,totalprice], (err, result) => {
        if (err) {
              console.log(err);
            callback(err, null);
        } else {
             callback(null, result.insertId);
            console.log(result);
        }
    });
}

// Read orders
function getorders(callback) {
    const query = "SELECT * FROM orders";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// Update a orders
function updateorders(ordersId,ordersData, callback) {
    const { city, totalprice} =ordersData;
    const query = 'UPDATE orders SET city = ?, totalprice = ? WHERE order_id = ?';
    dbCon.query(query, [city, totalprice, ordersId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

// Delete a orders
function deleteorders(ordersId, callback) {
    const query = 'DELETE FROM orders WHERE order_id = ?';
    dbCon.query(query, [ordersId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createorders,
    getorders,
    updateorders,
    deleteorders
};
