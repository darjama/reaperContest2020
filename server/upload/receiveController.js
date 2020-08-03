const multer = require('multer');
const FTPStorage = require('multer-sftp');
const config = require('../../config.js');
const entries = require('../db/entriesController');
const path = require('path');

var uploadedName = '';

var upload = multer({
  storage: new FTPStorage({
    destination: '/home/contest1/entries',
    sftp: {
      host: config.get('ftps.host'),
      port: config.get('ftps.port'),
      username: config.get('ftps.un'),
      password: config.get('ftps.pw')
    },
    filename: function (req, file, cb) {
      let dateNow = Date.now();
      uploadedName = dateNow + '-' +file.originalname;
      cb(null, uploadedName)
  }
})

}).single('file')





exports.processUpload = function(req, res, next) {
  upload(req, res, function(err){
    req.body.success = false;
    req.body.filename = uploadedName;
    if (err instanceof multer.MulterError) {
      entries.addEntry(req);
      next(err)
      return;
    } else if (err) {
      entries.addEntry(req);
      next(err);
      return //res.status(500).json(err)
    }
    req.body.success = true;
    entries.addEntry(req);
    return res.status(200).send(req.file)
  })

}
