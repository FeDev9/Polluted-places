const db = require("../database");
const model = require('../models/placeModel');

module.exports = {

    home: (req, res) => {

        model.getPlaces((results) => {
            res.render('home', {
                places: results
            })
        });

    },

    upload: (req, res) => {

        res.render('upload');
    }

}