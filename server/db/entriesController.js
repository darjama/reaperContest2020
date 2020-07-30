const mongoose = require('mongoose'),
Entry = mongoose.model('Entries');

exports.addEntry  = function(req, res) {
  const newRecord = new Entry();
  newRecord.ipaddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  newRecord.timestamp = new Date();
  newRecord.email = req.body.email;
  newRecord.message = req.body.message;
  newRecord.zipfile = req.body.filename;
  newRecord.contestid = (newRecord.timestamp.getYear() + 1900) * 100 + (newRecord.timestamp.getMonth() + 1);
  newRecord.uploadSuccessful = req.body.success;
  newRecord.save({},function(err, confirmation) {
    if (err){
      console.log(err); //changed from res.send to accomodate separate upload
    }
    console.log(confirmation); //changed from res.send to accomodate separate upload
  });
};

exports.entries = function(req, res) {
  Entry.find({contestid: req.params.contestid}, function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });
}