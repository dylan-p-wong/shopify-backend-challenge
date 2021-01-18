const express = require('express');
const app = express();
const fs = require('fs'); 
require('dotenv').config()

if (!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
app.use('/image/', imageRoutes);
app.use('/user/', userRoutes);

const port = process.env.PORT || 1812;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});