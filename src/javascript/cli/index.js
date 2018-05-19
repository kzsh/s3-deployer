import { resolve } from 'path';
import yargs from 'yargs';
import Deployer from 'javascript/core';
import logger from 'javascript/logger';

export default {
  run() {
    yargs
      .command({
        command: '*',
        builder(yargs) {
          yargs.option('verbose', {
            alias: 'v',
            default: false
          });
        },
        handler(argv) {
          new Deploy();
        }
      }).argv
  }
};
