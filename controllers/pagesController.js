const db = require("../database");

module.exports = {

    home: (req, res) => {

        var sql = "SELECT * FROM places";

        db.query(sql, (err, result) => {

            try {
                res.render('home', { places: result });
            } catch (error) {
                res.render('home', {
                    msg: err
                });
            }
        });
    },

    upload: (req, res) => {

        res.render('upload');
    }

}