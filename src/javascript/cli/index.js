import yargs from 'yargs';
import Deployer from 'javascript/core';
import logger from 'javascript/logger';

export default {
  run() {
    return yargs
      .command({
        command: '*',
        builder(optionsBuilder) {
          optionsBuilder
            .require('file', {
              alias: 'f'
            })
            .option('verbose', {
              alias: 'v',
              default: false
            });
        },
        handler() {
          logger.info('Start program');
          new Deployer({
            bucket: 's3-deployer-test'
          }).deploy({
            source: 'testdir/foo/test.txt'

          });
          logger.info('End program');
        }
      }).argv;
  }
};
