const {Storage} = require('@google-cloud/storage');
//export GOOGLE_APPLICATION_CREDENTIALS="./upload.json";

var storage = new Storage()

const getSignedUploadUrl = async function(filename, bucket) {
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    contentType: 'application/octet-stream',
  }
  const date = new Date();
  const contestId = date.getFullYear().toString() + (date.getMonth() > 8 ? '': '0') +(date.getMonth() + 1).toString();
  try {
  const [url] = await storage.bucket(bucket).file(`upload/${contestId}/${filename}`).getSignedUrl(options);
  return url;
  } catch (err) {console.log(err)}
}

exports.processUpload = function(req, res, next) {
  getSignedUploadUrl(req.query.filename, "mindful-pillar-284616.appspot.com")
  .then(url => res.status(200).send(url))
  .catch(err => {
    console.log(err);
    return res.status(500).send(err);
  });
}
