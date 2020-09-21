module.exports = function(app) {
  var results = require('./resultController');
  app.route('/api/resultsdata/:contestid')
      .get(results.results)
};