const db = require('../config/database');

const Articles = {
    create: (name, description, category_id, callback) => {
        db.query('INSERT INTO articles (name, description, category_id) VALUES (?, ?, ?)', [name, description, category_id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    reed: (callback) => {
        const sql = `SELECT * FROM articles`;
        db.query(sql, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    update: (name, description, category_id, id,  callback) => {
        const sql = 'UPDATE articles SET name = ?, description = ?, category_id = ? WHERE id = ?';
        const values = [name, description, category_id, id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    delete: (id, callback) => {
        const sql = `DELETE FROM articles WHERE id = ?`;
        const values = [id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    show: (id, callback) => {
        const sql = `SELECT * FROM articles WHERE id = ?`;
        const values = [id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
};

module.exports = Articles;
