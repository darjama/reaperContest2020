const mongoose = require('mongoose'),
Vote = mongoose.model('Votes');

exports.results = function(req, res) {
  const contestid = req.params.contestid;
  Vote.find({ contestid }, function(err, votes) {
    if (err)
      res.send(err);
    res.json(votes);
  });
};