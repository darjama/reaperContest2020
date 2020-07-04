if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 3003;
let Client = require('ssh2-sftp-client');
let sftp = new Client();

sftp.connect({
  host: process.env.FTPHOST,
  port:  process.env.FTPPORT,
  username: process.env.FTPUN,
  password: process.env.FTPPW
}).then(() => {
  return sftp.list('/');
}).then(data => {
  console.log(data, 'the data info');
}).catch(err => {
  console.log(err, 'catch error');
});


app.use(cors());

app.use('/', express.static(__dirname + '/../dist/'))
app.use('/:id', express.static(__dirname + '/../dist/'))

app.listen(port, ()=>console.log(`Started ReaperContest server on port ${port} at ${new Date()}`))