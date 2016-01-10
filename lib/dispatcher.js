'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = require('./events');
var State = require('./state');
var Flog = require('./log');
var Promise = require('./config').getPromise();

var callbackSuccess = function callbackSuccess(state) {
  return function (data) {
    Flog('Action response', actionFn.actionName, data);

    State.set(state);

    var outputArr = ['actionComplete'];

    if (Array.isArray(data)) {
      data.forEach(function (v) {
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

var callbackError = function callbackError(err) {
  Flog.error('Action error: ', actionFn.actionName, err);
  this.out('actionError', actionFn.actionName, err);
};

var Dispatcher = function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    Object.assign(this, Events);
  }

  _createClass(Dispatcher, [{
    key: 'fire',
    value: function fire(actions, params) {
      var state = State.get();

      if (!Array.isArray(actions)) {
        actions = [actions];
      }

      var collector = new Promise(function (resolve) {
        resolve();
      });

      for (var i = 0; i < actions.length; i++) {
        var action = actions[i];

        if (action.actionName) {
          Flog('Action created', action.actionName, params);
        }

        collector = collector.then(action(state, params));
      }

      collector.then(callbackSuccess(state).bind(this)).catch(callbackError.bind(this));
    }
  }]);

  return Dispatcher;
}();

module.exports = new Dispatcher();