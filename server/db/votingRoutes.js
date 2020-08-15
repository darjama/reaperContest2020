module.exports = function(app) {
  var vote = require('./votingController');
  app.route('/api/addVote/')
      .post(vote.addVote)
};