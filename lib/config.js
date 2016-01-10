'use strict';

module.exports = {
  debug: false,
  Promise: require('bluebird'),
  routes: {},

  set: (key, value) => {
    this[key] = value;
  }
};
