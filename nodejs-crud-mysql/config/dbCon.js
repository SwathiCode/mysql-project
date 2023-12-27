const mysql = require('mysql');

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'root',
    database: 'website'
});

dbCon.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

module.exports = dbCon;
