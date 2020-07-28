module.exports = function(app) {
  var email = require('./emailController');
  app.route('/api/contactform')
      .post(email.email)

};