module.exports = function(app) {
  var dlLog = require('./dlLogController');
  app.route('/api/dlLog')
      .get(dlLog.readLog)
  app.route('/api/dlLog')
      .post(dlLog.addLog)
};