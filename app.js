const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [], images: []}).write();
module.exports = db;

app.use(express.urlencoded({extended: true}))

const imageRoutes = require('./routes/imageRoutes');

app.use('/image/', imageRoutes);

const port = process.env.PORT || 1812;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});