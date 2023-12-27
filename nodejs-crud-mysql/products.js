const dbCon = require('./config/dbCon');

// Create a product
function createProduct(productData, callback) {
    const { product_id,price,phone_no,rating,category_id} = productData;
    const query = 'INSERT INTO product (product_id,price,phone_no,rating,category_id) VALUES (?,?,?,?,?)';
    dbCon.query(query, [ product_id,price,phone_no,rating,category_id], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
}

// Read products
function getProducts(callback) {
    const query = "SELECT * FROM product";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}
function getProductsbycategoryid(category_id,callback) {
    const query ="SELECT * FROM product where category_id = ?";
    dbCon.query(query,[category_id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}



function getfiltersData(filterData,callback){
    const { begin,end,contains,searchType,mustcontains,notcontains} = filterData;
    let sql="SELECT phone_no FROM product WHERE phone_no LIKE "

    if(searchType =="global"){
        if(contains != ""){
          sql=sql+'"'+"%"+contains+"%"+'"';
        }
        } else if(searchType =="premium"){
          if(begin != ''){
            sql=sql+'"'+begin+"%"+'"';
           } else if(end != ""){
             sql=sql+'"'+"%"+end+'"';
           } else if(contains != ""){
            sql=sql+'"'+"%"+contains+"%"+'"';
          }
        } else if(searchType =="advance"){
          if(begin != ''){
            sql=sql+' "'+begin+"%"+'"';
           } 
            if(end != ""){
             sql=sql+'AND phone_no LIKE"'+"%"+end+'"';
           } 
            if(contains != ""){
            sql=sql+'AND phone_no LIKE"'+"%"+contains+"%"+'"';
          } 
           if(mustcontains !=""){
            sql=sql+'AND phone_no LIKE"'+"%"+mustcontains+"%"+'"';
          }
           if(notcontains !=""){
            sql=sql+'AND phone_no NOT LIKE"'+"%"+notcontains+"%"+'"';
          }
        
         // console.log(sql);
        
        }
        dbCon.query(sql, [begin,end,contains,searchType,mustcontains,notcontains], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}





// Update a product
function updateProduct(productId, productData, callback) {
    const { phone_no, rating, price } = productData;
    const query = 'UPDATE product SET phone_no = ?, rating = ?, price = ? WHERE product_id = ?';
    dbCon.query(query, [ phone_no, rating, price, productId], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}


// Delete a product
function deleteProduct(productId, callback) {
    const query = 'DELETE FROM product WHERE product_id = ?';
    dbCon.query(query, [productId], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductsbycategoryid,
    getfiltersData,
    
};
