const { keyBy } = require('lodash');

const mongoose = require('mongoose'),
  Vote = mongoose.model('Votes');

exports.results = function (req, res) {
  const contestid = req.params.contestid;
  Vote.find({ contestid }, function (err, votes) {
    if (err) res.send(err);
    res.json(votes);
  });
};

exports.resultsRaw = async function (contestid) {
  const votes = await Vote.find({ contestid }).lean();
  const newVotes = [...votes].map((vote) => {
    const newVote = { ...vote };
    newVote.ratings = Object.entries(vote.ratings).map(([key, value]) => ({
      entryid: key,
      rating: value,
    }));
    if (vote.notes) {
      newVote.notes = JSON.stringify(vote.notes);
    }
    return newVote;
  });

  return newVotes;
};
