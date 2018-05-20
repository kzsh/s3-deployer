import glob from 'glob';
import yargs from 'yargs';

import Deployer from 'javascript/core';
import environment from 'javascript/core/environment';
import logger from 'javascript/logger';

function buildGlob(pattern) {
  return new Promise(function(resolve, reject) {
    glob(pattern, {}, function(err, files) {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

export default {
  run() {
    return yargs
      .command({
        command: '*',
        builder(optionsBuilder) {
          optionsBuilder
            .require('file', {
              alias: 'f'
            .option('dry-run', {
              alias: 'd',
              default: false
            })
            .option('verbose', {
              alias: 'v',
              default: false
            });
        },
        handler(env) {
          environment.initialize(env);
          logger.setLogLevel('NORMAL');
          logger.info('Start program');
          new Deployer({
            bucket: 's3-deployer-test'
          }).deploy({
            sources: buildGlob('dist/*')
          }).then(function(data) {
            logger.debug(data);
          }).catch(function(err) {
            logger.error(err);
          });
        }
      }).argv;
  }
};
