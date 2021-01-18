const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const db = require('../app');

router.route('/upload').post(upload.single('image'), (req, res) => {
    if (!req.file){
        return res.status(404).json({
            msg: "Image upload failed"
        });
    }
    
    const image = {
        title: req.body.title,
        text: req.body.text,
    }

    console.log(image);

    db.get('images').push(image).write();
    
    res.status(200).json({
        msg: "Image uploaded successfully"
    });
});

module.exports = router;