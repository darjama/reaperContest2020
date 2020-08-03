const uploads = require('./receiveController');

module.exports = function(app) {
  app.post('/upload', uploads.processUpload)
};