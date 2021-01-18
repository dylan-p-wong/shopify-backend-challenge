const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../dbConfig').db;
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/jwtMiddleware');

router.route('/signup').post(async (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(404).json({
            msg: "Fill in fields"
        });
    }

    const user1 = db.get('users').find({ username: req.body.username}).value();

    if (user1 && user1.username === req.body.username){
        return res.status(404).json({
            msg: "User already exist"
        })
    }

    const hash = await argon2.hash(req.body.username);

    const user = {
        id: uuidv4(),
        username: req.body.username,
        password: hash,
        images: []
    }

    db.get('users').push(user).write();

    const token = jwt.sign(user, process.env.JWT_SECRET); 
    
    res.status(200).json({
        msg: "User created",
        jwt: token
    });
});

router.route('/login').post((req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(404).json({
            msg: "Fill in fields"
        });
    }

    const user = db.get('users').find({ username: req.body.username}).value();
    
    if (!user) {
        return res.status(404).json({
            msg: "No user with that username exists"
        });
    }
    
    const token = jwt.sign(user, process.env.JWT_SECRET); 
    
    res.status(200).json({
        msg: "Login successful",
        jwt: token
    });
});

router.route('/').get(auth, (req, res) => {
    res.status(200).json({
        images: req.user.images
    });
});

module.exports = router;