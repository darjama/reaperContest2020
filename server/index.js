if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 3003;
const Contest = require('../db/model');
const bodyParser = require('body-parser');

// let Client = require('ssh2-sftp-client');
// let sftp = new Client();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("json spaces", 2);

var contestRoutes = require('../db/contestRoutes');
contestRoutes(app);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'dist')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', (req,res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

// sftp.connect({
//   host: process.env.FTPHOST,
//   port:  process.env.FTPPORT,
//   username: process.env.FTPUN,
//   password: process.env.FTPPW
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