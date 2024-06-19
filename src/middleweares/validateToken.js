// validate.js (Middleware de autenticación)

const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

const authRequired = (req, res, next) => {
    const token = req.headers.authorization; // Token enviado en la cabecera Authorization

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token.replace('Bearer ', ''), TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authRequired
};
