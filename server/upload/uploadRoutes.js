const uploads = require('./receiveController');

module.exports = function(app) {
  app.get('/api/upload', uploads.processUpload)
};