const config = require('../config.js');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const models = require('./db/model');
const Contest = models.ContestModel;
const DlLog = models.DlLogModel;
const Entry = models.EntryModel;
const bodyParser = require('body-parser');

const port = config.get('port');


// let Client = require('ssh2-sftp-client');
// let sftp = new Client();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("json spaces", 2);

var contestRoutes = require('./db/contestRoutes');
contestRoutes(app);

var dlLogRoutes = require('./db/dlLogRoutes');
dlLogRoutes(app);

var emailRoutes = require('./email/emailRoutes');
emailRoutes(app);

var entriesRoutes = require('./db/entriesRoutes');
entriesRoutes(app);

var uploadedName = '';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    let dateNow = Date.now()
    uploadedName = dateNow + '-' +file.originalname;
    cb(null, uploadedName )
  }
})

var upload = multer({ storage: storage }).single('file')

var entries = require('./db/entriesController');
app.post('/upload', (req,res) => {
  //entries.addEntry(req, res);
  let success = false;
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      entries.addEntry(req);
      return res.status(500).json(err)
    } else if (err) {
      entries.addEntry(req);
      return res.status(500).json(err)
    }
    success = true;
    req.body.success = success;
    req.body.filename = uploadedName;
    entries.addEntry(req);
    return res.status(200).send(req.file)
  })
})


// sftp.connect({
//   host: config.get(ftps.host),
//   port:  config.get(ftps.port),
//   username: config.get(ftps.un),
//   password: config.get(ftps.pw)
// }).then(() => {
//   return sftp.list('/');
// }).then(data => {
//   console.log(data, 'the data info');
// }).catch(err => {
//   console.log(err, 'catch error');
// });

app.use('/', express.static(__dirname + '/../dist/'))
app.use('/:id', express.static(__dirname + '/../dist/'))

app.listen(port, ()=>console.log(`Started ReaperContest server on port ${port} at ${new Date()}`))