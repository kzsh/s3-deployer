import AWS from 'aws-sdk';
import fs from 'fs';

export default class S3 {
  constructor({ bucket }) {
    this.bucket = bucket;
    this.service = new AWS.S3();
  }

  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      stream.on('error', reject);

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
