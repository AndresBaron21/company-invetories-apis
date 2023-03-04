const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: 'Authentication required' });
    } else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Invalid token' });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    }
};

module.exports = authMiddleware;
