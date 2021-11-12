const admin = require('../config/firebase-config');

class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);

            if (decodeValue) {
                req.user = decodeValue;
                console.log(decodeValue)
                return next();
            }
            return res.json({ message: 'Un authorize' });
        } catch (e) {
            console.log(e)
            return res.json({ message: 'Internal Error' });
        }
    }
}

module.exports = new Middleware();

