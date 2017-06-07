const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);

//set up alt version for web...
var secretAWS = require('../secret.js');
var AWS = require('aws-sdk');

AWS.config = new AWS.Config();
  AWS.config.accessKeyId = secretAWS.key;
  AWS.config.secretAccessKey = secretAWS.secret;
  AWS.config.signatureVersion ='v4';
  AWS.config.setPromisesDependency(require('bluebird'));

var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-2'});

var ImageUploaderAWS = function(options) { //AWS collection

  var file = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  var fileName = options.filename;
  var photoKey = 'images/' + fileName;

  var params = {
    Bucket: 'newberry-images',
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  };

  var putObjectPromise = s3.putObject(params).promise();
  return putObjectPromise;

}

var ImageUploader = function(options) { //local collection

  var file = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  var fileName = options.filename;
  var photoKey = './public/img/' + fileName;

  var writeObjectPromise = writeFile(photoKey, file,  'base64');
  return writeObjectPromise;

}

module.exports = {
    ImageUploaderAWS,
    ImageUploader,
  };
