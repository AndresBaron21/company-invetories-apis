const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const connection = require('../config/database');

const secretKey = 'mySecretKey';
let roles = [];
let token = '';

const getRoles = (id) => {
    const userId = id;
    // Query to get user roles
    const query = `
      SELECT roles.*
      FROM roles
      JOIN role_user ON roles.id = role_user.role_id
      JOIN users ON role_user.user_id = users.id
      WHERE users.id = ${userId};
    `;
  
    // Run the query
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error getting user roles');
        return;
      }
      roles = results.map((rol) => rol.name);
    });
}

const AuthController = {
    register: (req, res) => {
        const { email, name, password } = req.body;
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                User.create(email, name, hashedPassword, (err, userId) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    } else {
                        const payload = {
                            userId: userId,
                            roles: ['external']
                        };
                        const token = jwt.sign(payload, secretKey);
                        const id = userId;
                        const status = true;
                        const message = 'User Logged In Successfully';
                        res.status(200).json({ token, id, status, message });
                    }
                });
            }
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        User.findByEmail(email, (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
            } else {
                getRoles(user.id)
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    } else if (!match) {
                        res.status(401).json({ error: 'Invalid email or password' });
                    } else {
                        const payload = {
                            userId: user.id,
                            roles: roles
                        };
                        token = jwt.sign(payload, secretKey);
                        const id = user.id;
                        const status = true;
                        const message = 'User Logged In Successfully';
                        res.status(200).json({ token, roles, id, status, message });
                    }
                });
            }
        });                
    }
};

module.exports = AuthController;
