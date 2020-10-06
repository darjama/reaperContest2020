const mongoose = require('mongoose'),
Contest = mongoose.model('Contests');

exports.contests = function(req, res) {
  Contest.find( {}, null, {sort: {contestid: -1}}, function(err, contest) {
    if (err)
      res.send(err);
    res.json(contest);
  });
};

exports.contest = function(req, res) {
  const month = req.params.month;
  const year = req.params.year;
  Contest.findOne({ month, year }, function(err, contest) {
    if (err)
      res.send(err);
    res.json(contest);
  });
};