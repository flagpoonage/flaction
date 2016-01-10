'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Immutable = require('immutable');

var State = function () {
  function State() {
    _classCallCheck(this, State);

    this.__internal = Immutable.Map({});
  }

  _createClass(State, [{
    key: 'get',
    value: function get(key) {
      if (!key) {
        return this.__internal.toJS();
      }

      var res = this.__internal.getIn(key.split('.'));

      if (typeof res.toJS === 'function') {
        return res.toJS();
      }

      return res;
    }
  }, {
    key: 'set',
    value: function set(data) {
      if (typeof data === 'undefined' || data === null) {
        this.__internal = Immutable.fromJs({});
      }

      this.__internal = Immutable.fromJS(data);
    }
  }]);

  return State;
}();

module.exports = new State();