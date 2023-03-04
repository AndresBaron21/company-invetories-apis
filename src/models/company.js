const db = require('../config/database');

const Company = {
    create: (tin, name, address, phone, user_id, callback) => {
        db.query('INSERT INTO companies (tin, name, address, phone, user_id) VALUES (?, ?, ?, ?, ?)', [tin, name, address, phone, user_id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    reed: (callback) => {
        const sql = `SELECT * FROM companies`;
        db.query(sql, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    update: (name, address, phone, user_id, tin,  callback) => {
        const sql = 'UPDATE companies SET name = ?, address = ?, phone = ?, user_id = ? WHERE tin = ?';
        const values = [name, address, phone, user_id, tin];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.insertId);
            }
        });
    },
    delete: (tin, callback) => {
        const sql = `DELETE FROM companies WHERE tin = ?`;
        const values = [tin];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    show: (tin, callback) => {
        const sql = `SELECT * FROM companies WHERE tin = ?`;
        const values = [tin];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
    getCategories: (company_id, callback) => {
        const sql = `SELECT categories.*
        FROM categories
        WHERE categories.company_id = ?`;
        const values = [company_id];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
};

module.exports = Company;
