import CliLib from 'javascript/cli';
import S3 from 'javascript/core/aws/s3';
import logger from 'javascript/logger';

export default class Deployer {
  constructor({ bucket }) {
    logger.debug(`Initialize S3 with bucket: ${bucket}`);
    this.bucket = bucket;
    this.s3 = new S3({
      bucket: this.bucket
    });
  }

  deploy({ sources }) {
    return sources.then(s => {
      logger.debug(`Deploying:\n\t\t${s.join('\n\t\t')}`);
      return Promise.all(
        s.map(this.s3.uploadFile.bind(this.s3))
      );
    });
  }
}

export const Cli = CliLib;
