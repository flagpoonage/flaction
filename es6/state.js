'use strict';

let Immutable = require('immutable');

class State {
  constructor () {
    this.__internal = Immutable.Map({});
  }

  get (key) {
    if(!key) {
      return this.__internal.toJS();
    }

    let res = this.__internal.getIn(key.split('.'));

    if(typeof res.toJS === 'function') {
      return res.toJS();
    }

    return res;
  }

  set (data) {
    if(typeof data === 'undefined' || data === null) {
      this.__internal = Immutable.fromJs({});
    }

    this.__internal = Immutable.fromJS(data);
  }
}

module.exports = new State();
