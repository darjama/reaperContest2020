var contest = require('./contestController');

module.exports = function (app) {
  app.route('/api/contests').get(contest.contests);

  app.route('/api/contests/current').get(contest.currentContest);

  app.route('/api/contests/:month/:year').get(contest.contest);

  app.route('/api/resultscontest').get(contest.resultsContest);

  app.route('/api/contestnames').get(contest.contestNames);
};
