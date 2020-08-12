module.exports = function(app) {
  var entry = require('./entriesController');
  app.route('/api/entries/:contestid')
      .get(entry.entries)
  app.route('/api/entry')
      .post(entry.addEntry)
  app.route('/api/entriesanon/:year/:month')
      .get(entry.entriesAnon)
};