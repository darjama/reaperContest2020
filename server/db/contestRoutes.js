module.exports = function(app) {
  var contest = require('./contestController');
  app.route('/api/contests')
      .get(contest.contests)
  app.route('/api/contests/:month/:year')
      .get(contest.contest)
};