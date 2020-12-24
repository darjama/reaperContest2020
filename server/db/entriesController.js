const mongoose = require('mongoose'),
Entry = mongoose.model('Entries');

exports.addEntry  = function(req, res) {
  console.log(req.body)
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
  newRecord.mixnum = null;
  newRecord.contestant = null;
  newRecord.audiouri = null;
  newRecord.save({},function(err, data) {
    if (err){
      console.log(err); //changed from res.send to accomodate separate upload
      return res.status(500).send(err);
    }
    console.log(data); //changed from res.send to accomodate separate upload
    res.json(data);
  })
};


exports.entries = function(req, res) {
  Entry.find({contestid: req.params.contestid,  mixnum: {$ne: null}}, {}, {sort: {mixnum: 1}}, function(err, list) {
    if (err)
      res.send(err);
    res.json(list);
  });
}

exports.entriesAnon = function(req, res) {
  const month = '0' + req.params.month;
  const contestid = '' + req.params.year +  month.substring(month.length -2);
  Entry.find({contestid, mixnum: {$ne: null}}, 'mixnum audiouri contestid', {sort: {mixnum: 1}}, function(err, list) {
    if (err) res.send(err);
    list.sort((a,b) => a-b)
    return res.json(list);
  });
}