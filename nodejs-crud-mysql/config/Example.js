const mysql = require('mysql');

const Example = mysql.createConnection({
      host: 'localhost',
      user: 'newuser',
      password: 'root',
      database: 'website'
    });
  
    const pool = mysql.createPool(Example);
  
    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();
  let sql="SELECT phone_no FROM product WHERE phone_no LIKE"
  
  
  
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
  
    console.log(sql);
  
  } 
  
  
  
  
  
  
  
      const [rows] = await connection.query(sql);
  
   if (rows.length === 0) {
        throw new Error('product not found');
      }
      const productsData = rows;
      return productsData;
    } catch (error) {
      throw error;
    } finally {
      // Release the connection back to the pool
      if (pool && pool.end) {
        pool.end();
      }
    }
    
  
  
  