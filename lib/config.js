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

  getDebug: () => {
    return config.debug;
  },

  getPromise: () => {
    return config.Promise;
  },

  getRoutes: () => {
    return config.routes;
  },

  set: (key, value) => {
    config[key] = value;
  },

  setDebug: (value) => {
    config.debug = value;
  },

  setPromise: (value) => {
    config.Promise = value;
  },

  setRoutes: (value) => {
    config.routes = value;
  }
};
