const express = require('express');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql2');
var placesController = require('./controllers/placesController');

//Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

//init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('img');


//check file type
function checkFileType(file, cb) {
    //Allowed ext 
    const filetypes = /jpeg|jpg|png|gif|svg/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        return cb('Error: img only');
    }
}

var app = express();

//create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'placespolluted'
})

//connect to mysql
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySql connected')
})

//set up templete engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));


//fire controllers
placesController(app, upload, db);

//listen port
app.listen(3000);
console.log('You a listening to port 3000');