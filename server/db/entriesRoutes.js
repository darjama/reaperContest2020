module.exports = function(app) {
  var entry = require('./entriesController');
  app.route('/api/entries/:contestid')
      .get(entry.entries)
  app.route('/api/entry')
      .post(entry.addEntry)
};