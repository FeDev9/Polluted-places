const db = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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


module.exports = {

    upload: (req, res) => {
        upload(req, res, (err) => {

            try {

                var post = {
                    address: req.body.address,
                    img: req.file.filename,
                    city: req.body.city
                }

                db.query("INSERT INTO places SET ?", post, (err, result) => {

                    try {
                        res.redirect('/');
                    } catch (err) {
                        res.render('upload', {
                            msg: err
                        });
                    }
                })

            } catch (err) {
                res.render('upload', {
                    msg: err
                });
            }

        });

    },

    delete: (req, res) => {
        const sql = `SELECT * FROM places WHERE id = ${req.params.id}`;

        try {
            db.query(sql, (err, result) => {
                try {
                    const filePath = 'public/uploads/' + result[0].img;
                    fs.unlinkSync(filePath);
                } catch (err) {
                    res.render('upload', {
                        msg: err
                    });
                }


            })

            db.query(`DELETE FROM places WHERE id = ${req.params.id}`,
                (err, result, fields) => {
                    try {
                        console.log("deleted Record: " + result.affectedRows);
                        res.redirect('/');
                    } catch (error) {
                        res.render('upload', {
                            msg: err
                        });
                    }
                });

        } catch (err) {
            res.render('upload', {
                msg: err
            });
        }


    }
}



