const res = require('express/lib/response');
const db = require('../database');


module.exports = {

    getPlaces: (cb) => {
        var sql = "SELECT * FROM places";

        db.query(sql, (err, result) => {
            try {
                return cb(result);

            } catch (err) {
                res.render('home', {
                    msg: err
                });
            }
        });
    },

    addPlace: (placeDetails, cb) => {

        db.query("INSERT INTO places SET ?", placeDetails, (err, results) => {

            try {
                return cb(results);
            } catch (err) {
                res.render('upload', {
                    msg: err
                });
            }
        })
    },

    getPlace: (placeDetails, cb) => {

        db.query('SELECT * FROM places WHERE ?', placeDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                res.render('home', {
                    msg: err
                });
            }
        });
    },

    deletePlace: (placeDetails, cb) => {

        db.query('DELETE FROM places WHERE ?', placeDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                res.render('home', {
                    msg: err
                });
            }

        })

    }
}