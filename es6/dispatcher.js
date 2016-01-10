'use strict';

let Events = require('./events');
let State = require('./state');
let Flog = require('./log');
let Promise = require('./config').getPromise();

let nextAction = (state, params, action) => {
  return action(state, params).then((data) => {
    Flog('Action response', action.actionName, data);
    return data;
  });
};

let callbackSuccess = (state) => {
  return function(data) {
    State.set(state);

    var outputArr = ['actionsComplete'];

    if(Array.isArray(data)) {
      data.forEach((v) => {
        outputArr.push(v);
      });
    } else {
      outputArr.push(data);
    }

    this.out.apply(this, outputArr);

    return data;
  };
};

let callbackError = function(err) {
  Flog.error('Action error: ', actionFn.actionName, err);
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
        Flog('Action created', action.actionName, params);
      }

      collector = collector.then(nextAction(state, params, action));
    }

    collector.then(callbackSuccess(state).bind(this)).catch(callbackError.bind(this));
  }
}

module.exports = new Dispatcher();
