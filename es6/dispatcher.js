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

let callbackSuccess = function(data) {
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

let callbackError = (action) => {
  return function(err) {
    Flog.error('Action error: ', action.actionName, err);
    this.out('actionError', action.actionName, err);
  };
};

class Dispatcher {

  constructor () {
    Object.assign(this, Events);
  }

  fire (actions, params) {
    let state = State._getTrueState();

    if(!Array.isArray(actions)) {
      actions = [actions];
    }

    //let collector = new Promise((resolve) => { return resolve(); });

    let collector = [];

    for (let i = 0; i < actions.length; i++) {
      let action = actions[i];

      if(action.actionName) {
        Flog('Action created', action.actionName, params);
      }

      collector.push(nextAction(state, params, action).catch(callbackError(action).bind(this)));
    }

    return Promise.all(collector).then(callbackSuccess.bind(this));

    //return collector.then(callbackSuccess.bind(this));
  }
}

module.exports = new Dispatcher();
