var bodyParser = require('body-parser');
const { get, render } = require('express/lib/response');
var placeModel = require('../models/placeModel');


var urlencodedParser = bodyParser.urlencoded({ extended: false });



module.exports = function (app, upload, db) {
    app.use(bodyParser.json());

    app.get('/', (req, res) => {

        placeModel.getPlaces(db, res, req);

    });

    app.get('/upload', (req, res) => {

        res.render('upload');
    })

    app.post('/upload', urlencodedParser, (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.render('upload', {
                    msg: err
                });
            }
            if (req.file == undefined || req.body.address == '' || req.body.city == '') {
                res.render('upload', {
                    msg: 'Error : fill all fields'
                })
            }
            else {

                placeModel.setPlaces(db, res, req)

            }
        })
    })

    app.get('/delete/:id', function (req, res) {

        placeModel.deletePlaces(db, res, req);
    });
}


