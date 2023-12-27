const dbCon = require('./config/dbCon');


// Create a user
function createuser(usersData, callback) {
    const {User_id, country_id, mob_no,OTP,Email} =usersData;
    const query = 'INSERT INTO user (User_id, country_id, mob_no,OTP,Email) VALUES (?, ?, ?,?,?)';
    dbCon.query(query, [User_id, country_id, mob_no,OTP,Email], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
}

// Read User
function getuser(callback) {
    const query = "SELECT * FROM user";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


// Update a user
function updateuser(usersId,usersData, callback) {
    const {Email } =usersData;
    const query = 'UPDATE user SET Email = ? WHERE User_id =?';
    dbCon.query(query, [Email , usersId], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

// Delete a user
function deleteuser(usersId, callback) {
    const query = 'DELETE FROM user WHERE User_id = ?';
    dbCon.query(query, [usersId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createuser,
    getuser,
    updateuser,
    deleteuser
};
