const db = require('../config/database');

const Category = {
    create: (name, company_id, callback) => {
        db.query('INSERT INTO categories (name, company_id) VALUES (?, ?)', [name, company_id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    reed: (callback) => {
        const sql = `SELECT * FROM categories`;
        db.query(sql, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    update: (name, company_id, id,  callback) => {
        const sql = 'UPDATE categories SET name = ?, company_id = ? WHERE id = ?';
        const values = [name, company_id, id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    delete: (id, callback) => {
        const sql = `DELETE FROM categories WHERE id = ?`;
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
        const sql = `SELECT * FROM categories WHERE id = ?`;
        const values = [id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    getArticles: (category_id, callback) => {
        const sql = `SELECT articles.*
        FROM articles
        WHERE articles.category_id = ?`;
        const values = [category_id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
};

module.exports = Category;
