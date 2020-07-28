const nodemailer = require("nodemailer");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// async..await is not allowed in global scope, must use a wrapper
async function main(req, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMN,  // generated ethereal user
      pass: process.env.GMP, // generated ethereal password
    },
  });

  let ipaddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"reMIXed" <reamixed@gmail.com>', // sender address
    to: "darmarco@gmail.com",  // list of receivers
    subject: "reaMIXed Contact Form", // Subject line
    text: req.body.message + `
    IP ADDR: ${ipaddr}
    FROM: ${req.body.email}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

exports.email = function(req, res) {
  main(req, res).then(a => res.status(200).send()).catch(err => res.send(err))
};