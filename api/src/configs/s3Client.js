const aws = require('aws-sdk');
const config = require('./config');

const s3 = new aws.S3({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  },
  bucketEndpoint: true,
});

module.exports = { s3 };
