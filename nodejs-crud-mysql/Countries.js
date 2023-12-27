const dbCon = require('./config/dbCon');

// Create a countries
function createcountries(countryData, callback) {
    const { name,country_id  } = (countryData);
    const query = 'INSERT INTO countries (name,country_id) VALUES (?, ?)';
    dbCon.query(query, [name, country_id ], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }
    });
}

// Read countries
function getcountries(callback) {
    const query = "SELECT * FROM countries";
    dbCon.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

// Update a countries
function updatecountries(country_id , countryData, callback) {
    const { name } = countryData;
    const query = 'UPDATE countries SET name =?  WHERE country_id = ?';
    dbCon.query(query, [name,country_id ], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

// Delete a countries
function deletecountries(country_id , callback) {
    const query = 'DELETE FROM countries where country_id = ?';
    dbCon.query(query, [country_id ], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.affectedRows);
        }
    });
}

module.exports = {
    createcountries,
    getcountries,
    updatecountries,
    deletecountries
};
