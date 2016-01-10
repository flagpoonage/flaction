'use strict';

let Events = require('./events');
let State = require('./state');
let logger = require('./log');
let Promise = require('./config').getPromise();

let callbackSuccess = (state) => {
  return function(data) {
    logger.text('Action response', actionFn.actionName, data);

    State.set(state);

    var outputArr = ['actionComplete'];

    if(Array.isArray(data)) {
      data.forEach((v) => {
        outputArr.push(v);
      });
    } else {
      outputArr.push(data);
    }

    outputArr.push(actionFn.actionName);

    this.out.apply(this, outputArr);

    return data;
  };
};

let callbackError = function(err) {
  logger.error('Action error: ', actionFn.actionName, err);
  this.out('actionError', actionFn.actionName, err);
};

class Dispatcher {

  constructor () {
    Object.assign(this, Events);
  }

  fire (actions, params) {
    let state = State.get();

    if(!Array.isArray(actions)) {
      actions = [actions];
    }

    let collector = new Promise((resolve) => { resolve(); });

    for (let i = 0; i < actions.length; i++) {
      let action = actions[i];

      if(action.actionName) {
        logger.text('Action created', action.actionName, params);
      }

      collector = collector.then(action(state, params));
    }

    collector.then(callbackSuccess(state).bind(this)).catch(callbackError.bind(this));
  }
}

module.exports = new Dispatcher();
