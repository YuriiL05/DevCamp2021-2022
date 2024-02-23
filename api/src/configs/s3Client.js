import { S3Client } from '@aws-sdk/client-s3';
import config from './config.js';

const s3 = new S3Client({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  },
  bucketEndpoint: true,
});

export default s3;
