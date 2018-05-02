const chalk = require('chalk');
const { error, log, warn } = console;

module.exports = {
  info: function() {
    log(chalk.cyan('INFO: ', ...arguments));
  },

  error: function() {
    error(chalk.red('ERROR:', ...arguments));
  },

  warn: function() {
    warn(chalk.yellow('WARN: ', ...arguments));
  },

  debug: function() {
    log('DEBUG: ', ...arguments);
  },

  log: function() {
    console.log('LOG: ', ...arguments);
  }
};
