const chalk = require('chalk');
const { log } = console;

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
    log('DEBUG: ', ...arguments);
  },

  log: function() {
    log('LOG: ', ...arguments);
  }
};
