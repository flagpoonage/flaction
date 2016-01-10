'use strict';

let config = {
  debug: false,
  Promise: require('bluebird'),
  routes: {},
};

module.exports = {
  get: (key) => {
    return config[key];
  },

  set: (key, value) => {
    config[key] = value;
  }
};
