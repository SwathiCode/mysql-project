const dbCon = require('./config/dbCon');

// Create a orderitems
function createorderitems(orderitemData,orderId, callback) {
   
    //array of products
    for (let i = 0; i <orderitemData.products.length; i++) {
        product=orderitemData.products[i];
console.log(orderitemData);
orderitemData["product_id"]=product.product_id;
orderitemData["order_id"]=orderId;

        const {orderitems_id, product_id, quantity, order_id } = orderitemData;
        const query = 'INSERT INTO orderitems (orderitems_id, product_id, quantity, order_id) VALUES (?, ?, ?,?)';
        dbCon.query(query, [orderitems_id, product_id, quantity, order_id], (err, result) => {
            if (err) {
                console.log(err);
               callback(err, null);
            } else {
                //  callback(null, result.insertId);
                console.log(result);
            }
        });
      }
    
    
}

// Read orderitems
function getorderitems(callback) {
    const query = "SELECT * FROM orderitems";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// Update a orderitems
function updateorderitems(orderitemId, orderitemData, callback) {
    const {  quantity} = orderitemData;
    const query = 'UPDATE orderitems SET quantity = ? WHERE orderitems_id = ?';
    dbCon.query(query, [ quantity,orderitemId], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

// Delete a orderitems
function deleteorderitems(orderitemId, callback) {
    const query = 'DELETE FROM orderitems WHERE orderitems_id = ?';
    dbCon.query(query, [orderitemId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createorderitems,
    getorderitems,
    updateorderitems,
    deleteorderitems
};
