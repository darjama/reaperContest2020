const mongoose = require('mongoose'),
  Contest = mongoose.model('Contests');

exports.contests = function (req, res) {
  Contest.find({}, null, { sort: { contestid: -1 } }, function (err, contest) {
    if (err) res.send(err);
    res.json(contest);
  });
};

exports.contest = function (req, res) {
  const month = req.params.month;
  const year = req.params.year;
  Contest.findOne({ month, year }, function (err, contest) {
    if (err) return res.send(err);
    res.json(contest);
  });
};

exports.resultsContest = function (req, res) {
  Contest.findOne(
    { resultdate: { $lt: new Date() } },
    null,
    { sort: { resultdate: -1 } },
    function (err, contest) {
      if (err) return res.send(err);
      res.json(contest);
    }
  );
};

exports.contestNames = function (req, res) {
  Contest.find(
    {},
    ['contestid', 'contestlabel', 'songname', 'artist', 'resultdate'],
    { sort: { contestid: -1 } },
    function (err, contest) {
      if (err) return res.send(err);
      res.json(contest);
    }
  );
};
