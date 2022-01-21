const db = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const model = require('../models/placeModel');

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

            var placeDetails = {
                address: req.body.address,
                img: req.file.filename,
                city: req.body.city
            }

            model.addPlace(placeDetails, (results) => {
                res.redirect('/');
            });
        });
    },

    delete: (req, res) => {

        var placeDetails = {
            id: req.params.id
        }

        model.getPlace(placeDetails, (results) => {

            const filePath = 'public/uploads/' + results[0].img;
            fs.unlinkSync(filePath);

            model.deletePlace(placeDetails, (results) => {

                console.log("deleted Record: " + results.affectedRows);
                res.redirect('/');

            })

        });


    }
}



