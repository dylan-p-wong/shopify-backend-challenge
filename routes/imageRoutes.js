const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const db = require('../dbConfig').db;
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/jwtMiddleware');

router.route('/upload').post(auth, upload.single('image'), (req, res) => {
    if (!req.file){
        return res.status(404).json({
            msg: "Image upload failed"
        });
    }
    
    const image = {
        id: req.file.filename.split('.')[0],
        title: req.body.title,
        text: req.body.text,
        type: req.file.mimetype,
        author: req.user.id
    }

    db.get('images').push(image).write();
    
    let userImages = db
    .get('users')
    .find({id: req.user.id}).value().images;

    userImages.push(image.id);

    db.get('users').find({id: req.user.id}).assign({ images: userImages }).write();

    res.status(200).json({
        msg: `Image id=${image.id} Uploaded Successfully`
    });
});

router.route('/:id').get((req, res) => {
    const id = req.params.id;

    const image = db.get('images').find({ id: id}).value();

    if (!image){
        return res.status(404).json({
            msg: "Image with that id does not exist"
        })
    }

    const fileType = image.type === "image/jpeg" ? "jpg" : "png";

    res.status(200).sendFile(path.resolve(__dirname + `./../images/${id}.${fileType}`));
});

router.route('/delete/:id').post(auth, (req, res) => {
    const id = req.params.id;

    const image = db.get('images').find({ id: id }).value();

    if (!image){
        return res.status(404).json({
            msg: "Image with that id does not exist"
        })
    }

    if (image.author !== req.user.id){
        return res.status(401).json({
            msg: "This is not your post"
        })
    }

    const fileType = image.type === "image/jpeg" ? "jpg" : "png";

    fs.unlink(path.resolve(__dirname + `./../images/${id}.${fileType}`), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    db.get('images').remove({ id: id}).write();

    let userImages = db
    .get('users')
    .find({id: req.user.id}).value().images;

    userImages.filter(id => id === image.id);

    db.get('users').find({id: req.user.id}).assign({ images: userImages }).write();

    res.status(200).json({
        msg: "Image Deleted"
    });
});

module.exports = router;