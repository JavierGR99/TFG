const admin = require('../config/firebase-config');

class Middleware {
    async decodeToken(req, res, next) {

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeValue = await admin.auth().verifyIdToken(token);

            if (decodeValue) {
                req.user = decodeValue;
                // console.log(decodeValue)
                return next();
            }
        } catch (e) {
            console.log(e)
            return res.status(401).json({ error: e })
        }
    }
}

module.exports = new Middleware();

