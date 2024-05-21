const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const uploadDir = 'uploads/';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4()+" "+ file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
