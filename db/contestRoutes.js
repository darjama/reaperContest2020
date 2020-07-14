module.exports = function(app) {
  var contest = require('./contestController');
  app.route('/contests')
      .get(contest.contests)
  app.route('/contests/:month/:year')
      .get(contest.contest)
};