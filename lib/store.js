'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = require('./');
var Promise = require('./config').getPromise();
var Reqwest = require('reqwest');

var BaseStore = function () {
  function BaseStore() {
    _classCallCheck(this, BaseStore);

    Object.assign(this, Events);
  }

  _createClass(BaseStore, [{
    key: 'ajax',
    value: function ajax(options) {

      return new Promise(function (resolve, reject) {
        Reqwest(options).then(function (resp) {

          resolve(resp);
        }).fail(function (err, msg) {

          reject({ err: err, msg: msg });
        });
      });
    }
  }]);

  return BaseStore;
}();

module.exports = BaseStore;