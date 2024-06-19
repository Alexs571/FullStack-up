const { TOKEN_SECRET } = require('../config')
const jsonWebToken = require('jsonwebtoken')


function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jsonWebToken.sign(
            payload,
            TOKEN_SECRET,
            
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

module.exports = {
    createAccessToken
};