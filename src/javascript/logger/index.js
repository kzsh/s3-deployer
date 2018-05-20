const { inspect } = require('util');
const chalk = require('chalk');
const { error, log, warn } = console;

function inspectArgumentObjects(...args) {
  return args.map(arg => (arg instanceof Object) ? inspect(arg) : arg);
}

const logLevels = [
  'OFF',
  'ERROR',
  'NORMAL',
  'DEBUG'
];

let logLevel = 2;

export default {
  error: function() {
    if (logLevel < 1) { return; }
    error(chalk.red('ERROR:', ...arguments));
  },

  warn: function() {
    if (logLevel < 2) { return; }
    warn(chalk.yellow('WARN: ', ...arguments));
  },

  info: function() {
    if (logLevel < 2) { return; }
    log(chalk.cyan('INFO: ', ...arguments));
  },

  debug: function() {
    if (logLevel < 3) { return; }
    log('DEBUG: ', ...inspectArgumentObjects(...arguments));
  },

  setLogLevel(level) {
    logLevel = logLevels.indexOf(level.toUpperCase());
  }
};
