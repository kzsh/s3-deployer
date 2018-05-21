import glob from 'glob';
import yargs from 'yargs';

import Deployer from 'javascript/core';
import environment from 'javascript/core/environment';
import logger from 'javascript/logger';

function buildGlob({ pattern, root }) {
  return new Promise(function(resolve, reject) {
    glob(pattern, {
      cwd: root || process.cwd(),
      nodir: true
    }, function(err, files) {
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
            .option('path', {
              alias: 'p',
              demandOption: true,
              type: 'string'
            })
            .option('root', {
              alias: 'r',
              type: 'string'
            })
            .option('bucket', {
              alias: 'b',
              demandOption: true,
              type: 'string'
            })
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

          if (environment.get('verbose')) {
            logger.setLogLevel('DEBUG');

          } else {
            logger.setLogLevel('NORMAL');
          }

          logger.info('Start program');
          new Deployer({
            bucket: env.bucket
          }).deploy({
            sources: buildGlob({pattern: env.path, root: env.root})
          }).then(function(data) {
            logger.debug(data);
          }).catch(function(err) {
            logger.error(err);
          });
        }
      }).argv;
  }
};
