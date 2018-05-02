const yargs = require('yargs');
const Deploy = require('javascript/core');
const logger = require('javascript/logger');

module.exports = {
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
