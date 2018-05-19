import AWS from 'aws-sdk';
import fs from 'fs';

import logger from 'javascript/logger';

export default class S3 {
  constructor({ bucket }) {
    this.bucket = bucket;
    this.service = new AWS.S3();
  }

  uploadFile(filePath) {
    logger.info(filePath);
    const stream = fs.createReadStream(filePath);

    stream.on('error', function(err) {
      logger.error('File Read Stream:', err);
    });

    // stream.on('end', () => {
    //   console.log('end');
    // });

    const params = {
      Bucket: this.bucket,
      Key: 'fizz',
      Body: stream
    };
    const uploader = this.service.upload(params);

    uploader.send(function(err, data) {
      logger.info('READABLE:', err, data);
    });
  }
}
