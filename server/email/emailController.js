const nodemailer = require("nodemailer");
const config  = require("../../config.js")

// async..await is not allowed in global scope, must use a wrapper
async function main(req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get('gms.un'),
      pass: config.get('gms.pw')
    }
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
  main(req, res).then(a => res.status(200).send(a)).catch(err => res.status(500).send(err))
};