'use strict';

let config = require('./config');

let consoleFn = (type) => {
  return (...args) => {
    if(!config.getDebug() || !console) { return; }

    var logFn = 'console.' + type + '({param});';

    for(var i = 0; i < args.length; i++) {
      logFn = logFn.replace('{param}', 'args[' + i + '], {param}');
    }

    logFn = logFn.replace(', {param}', '');

    return new Function('args', logFn)(args); // eslint-disable-line no-new-func
  };
};

let flog = consoleFn('log');

flog.info = consoleFn('info');
flog.warn = consoleFn('warn');
flog.error = consoleFn('error');

module.exports = flog;
