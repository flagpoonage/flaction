'use strict';

var config = {
  debug: false,
  Promise: require('bluebird'),
  routes: {}
};

module.exports = {
  get: function get(key) {
    return config[key];
  },

  getDebug: function getDebug() {
    return config.debug;
  },

  getPromise: function getPromise() {
    return config.Promise;
  },

  getRoutes: function getRoutes() {
    return config.routes;
  },

  set: function set(key, value) {
    config[key] = value;
  },

  setDebug: function setDebug(value) {
    config.debug = value;
  },

  setPromise: function setPromise(value) {
    config.Promise = value;
  },

  setRoutes: function setRoutes(value) {
    config.routes = value;
  }
};