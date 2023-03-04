const db = require('../config/database');

const User = {
    create: (email, name, password, callback) => {
        db.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }
};

module.exports = User;
