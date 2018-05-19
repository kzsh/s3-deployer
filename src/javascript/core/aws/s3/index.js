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

      stream.on('error', function(err) {
        reject(err);
      });

      const params = {
        Bucket: this.bucket,
        Key: 'fizz',
        Body: stream
      };
      const uploader = this.service.upload(params);

      uploader.send(function(err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
