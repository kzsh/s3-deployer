import AWS from 'aws-sdk';
import environment from 'javascript/core/environment';
import fs from 'fs';
import logger from 'javascript/logger';

export default class S3 {
  constructor({ bucket }) {
    this.bucket = bucket;
    this.service = new AWS.S3();
  }

  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      if (environment.get('dry-run')) {
        logger.info(`DRY-RUN: would have uploaded: ${environment.get('root') || ''}${filePath} to ${filePath}`);
        resolve(filePath);
        return;
      }

      const stream = fs.createReadStream(filePath);
      stream.on('error', reject);

      logger.info(`Uploading: ${filePath} to s3:${this.bucket}/${filePath} `);

      this.service.upload({
        Bucket: this.bucket,
        Key: filePath,
        Body: stream
      }, function(err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
