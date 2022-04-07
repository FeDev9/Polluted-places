const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

var app = express();

//create connection 
require('./database');

//set up templete engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

app.use(bodyParser.json());

//fire controllers
const pagesRoute = require('./routes/Pages.js');
const placesRoute = require('./routes/Places.js');

app.use('/', pagesRoute)
app.use('/places', placesRoute);


//listen port
app.listen(3000);
console.log('You a listening to port 3000');