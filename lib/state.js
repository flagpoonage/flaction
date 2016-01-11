'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Immutable = require('immutable');

var State = function () {
  function State() {
    _classCallCheck(this, State);

    this._internal = {};
  }

  _createClass(State, [{
    key: '_getTrueState',
    value: function _getTrueState() {
      return this._internal;
    }
  }, {
    key: 'get',
    value: function get() {
      return Immutable.Map(this._internal).toJS();
    }
  }, {
    key: 'initialize',
    value: function initialize(data) {
      this._internal = Immutable.Map(data).toJS();
    }
  }]);

  return State;
}();

module.exports = new State();