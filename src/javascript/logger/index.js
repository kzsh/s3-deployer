const { inspect } = require('util');
const chalk = require('chalk');
const { log } = console;

function inspectArgumentObjects(...args) {
  return args.map(arg => (arg instanceof Object) ? inspect(arg) : arg);
}

export default {
  info: function() {
    log(chalk.cyan('INFO: ', ...arguments));
  },

  error: function() {
    log(chalk.red('ERROR:', ...arguments));
  },

  warn: function() {
    log(chalk.yellow('WARN: ', ...arguments));
  },

  debug: function() {
    log('DEBUG: ', ...inspectArgumentObjects(...arguments));
  },

  log: function() {
    log('LOG: ', ...arguments);
  }
};
