const mongoose = require('mongoose'),
DlLogs = mongoose.model('DlLogs');

exports.readLog = function(req, res) {
  DlLogs.find({}, function(err, dlLog) {
    if (err)
      res.send(err);
    res.json(dlLog);
  });
};

exports.addLog = function(req, res) {
  const newRecord = new DlLogs();
  newRecord.ipaddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  console.log(req.connection.remoteAddress, req.socket.remoteAddress, req.socket)
  newRecord.timestamp = new Date();
  newRecord.save({},function(err, confirmation) {
    if (err)
      res.send(err);
    res.json(confirmation);
  });
};