'use strict';

var config = require('./config');

var consoleFn = function consoleFn(type) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!config.debug || !console) {
      return;
    }

    var logFn = 'console.' + type + '({param});';

    for (var i = 0; i < args.length; i++) {
      logFn = logFn.replace('{param}', 'args[' + i + '], {param}');
    }

    logFn = logFn.replace(', {param}', '');

    return new Function('args', logFn)(args); // eslint-disable-line no-new-func
  };
};

var flog = consoleFn('log');

flog.info = consoleFn('info');
flog.warn = consoleFn('warn');
flog.error = consoleFn('error');

module.exports = flog;