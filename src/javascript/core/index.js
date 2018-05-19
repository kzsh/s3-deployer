import CliLib from 'javascript/cli';
import S3 from 'javascript/core/aws/s3';
import logger from 'javascript/logger';

export default class Deployer {
  constructor({ bucket }) {
    this.bucket = bucket;
  }

  deploy({source}) {
    logger.debug('Initialize S3');
    this.s3 = new S3({
      bucket: this.bucket
    });

    console.log('FILE:', source);
    console.log('BUCKET:', this.bucket);
    logger.debug('Upload to S3');
    return this.s3.uploadFile(source);
  }
}

export const Cli = CliLib;
