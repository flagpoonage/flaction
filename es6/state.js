'use strict';

let Immutable = require('immutable');

class State {
  constructor () {
    this._internal = {};
  }

  _getTrueState () {
    return this._internal;
  }

  get () {
    return Immutable.Map(this._internal).toJS();
  }

  initialize (data) {
    this._internal = Immutable.Map(data).toJS();
  }
}

module.exports = new State();
