const fs = require('fs');

exports.getPlaces = (db, res, req) => {

    var sql = "SELECT * FROM places";

    return db.query(sql, (err, result, fields) => {

        if (err) {
            res.render('home', {
                msg: err
            });
        }
        else {
            res.render('home', { places: result });
        }
    });
}

exports.setPlaces = (db, res, req) => {

    var post = {
        address: req.body.address,
        img: req.file.filename,
        city: req.body.city

    }

    let sql = "INSERT INTO places SET ?";

    return db.query(sql, post, (err, result) => {

        if (err) {

            res.render('upload', {
                msg: err
            });


        }
        else {
            res.redirect('/');
        }
    })
}

exports.deletePlaces = (db, res, req) => {

    const sql = `SELECT * FROM places WHERE id = ${req.params.id}`;

    db.query(sql, (err, result, fields) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        }
        else {

            console.log(result[0].img);
            const filePath = 'public/uploads/' + result[0].img;
            fs.unlinkSync(filePath);
        }


    })

    db.query(`DELETE FROM places WHERE id = ${req.params.id}`,
        function (err, result, fields) {
            if (err) {
                res.render('upload', {
                    msg: err
                });
            } else {

                console.log("deleted Record: " + result.affectedRows);
                res.redirect('/');

            }
        });
}