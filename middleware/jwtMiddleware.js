const jwt = require('jsonwebtoken');
const db = require('../dbConfig').db;

const jwtMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    
    if (token == null) {
        return res.status(401).json({
            msg: "You are not logged in"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            console.error(err);
            return;
        }

        const updatedUser = db.get('users').find({id: user.id}).value();

        if (!updatedUser){
            return res.status(401).json({
                "msg": "Error JWT not valid"
            });
        }

        req.user = updatedUser;
        next();
    });
}

module.exports = jwtMiddleware;