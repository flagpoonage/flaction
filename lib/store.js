'use strict';

let Events = require('./');
let Promise = require('./config').getPromise();
let Reqwest = require('reqwest');

class BaseStore {

  constructor () {
    Object.assign(this, Events);
  }

  ajax (options) {

    return new Promise((resolve, reject) => {
      Reqwest(options).then((resp) => {

        resolve(resp);

      }).fail((err, msg) => {

        reject({ err: err, msg: msg });

      });
    });
  }

}

module.exports = BaseStore;
