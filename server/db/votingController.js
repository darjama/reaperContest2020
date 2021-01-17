const mongoose = require('mongoose'),
  Vote = mongoose.model('Votes');

exports.addVote = function (req, res) {
  console.log(req.body);
  const newRecord = new Vote();
  newRecord.ipaddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  newRecord.time = new Date();
  newRecord.notes = req.body.notes || {};
  newRecord.contestid =
    newRecord.time.getFullYear() * 100 + (newRecord.time.getMonth() + 1);
  newRecord.ratings = req.body.ratings;
  // newRecord.second = req.body.second;
  // newRecord.third = req.body.third;
  // newRecord.voter = req.body.respondant;
  newRecord.save({}, function (err, data) {
    if (err) {
      console.log(err); //changed from res.send to accomodate separate upload
      return res.status(500).send(err);
    }
    console.log(data); //changed from res.send to accomodate separate upload
    res.json(data);
  });
};
