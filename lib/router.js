'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = require('./config');
var State = require('./state');

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.changeHandlers = [];
    this.readCurrentRoute();

    window.addEventListener('hashchange', this.readCurrentRoute.bind(this));
  }

  _createClass(Router, [{
    key: 'navigate',
    value: function navigate(value, params) {
      var hash = this.replaceParams(value, params);

      window.location.hash = '/' + hash;
    }
  }, {
    key: 'hashify',
    value: function hashify(value, params) {
      var hash = '/#/' + value;

      return this.replaceParams(hash, params);
    }
  }, {
    key: 'replaceParams',
    value: function replaceParams(value, params) {
      if (!params) {
        return value;
      }

      for (var i in params) {
        value = value.replace(':' + i, params[i]);
      }

      return value;
    }
  }, {
    key: 'readCurrentRoute',
    value: function readCurrentRoute() {
      var hash = '/' + window.location.hash;

      this.changeRoute(hash, this.findRoute(window.location.hash.substr(1)));
    }
  }, {
    key: 'changeRoute',
    value: function changeRoute(hash, route) {
      var appState = State.get();
      if (!route) {

        appState.route = {
          hash: hash,
          found: false
        };
      } else {
        appState.route = route;
        appState.route.hash = hash;
        appState.route.found = true;
      }

      State.set(appState);

      this.onChange(appState.route);
    }
  }, {
    key: 'findRoute',
    value: function findRoute(hash) {
      var _this = this;

      var filter = function filter(v) {
        return v.trim().length > 0;
      };

      var hashSplit = hash.split('/').filter(filter);
      var routeTable = Config.getRoutes();

      var _loop = function _loop(i) {
        var patternSplit = routeTable[i].split('/').filter(filter);

        if (hashSplit.length !== patternSplit.length) {
          return 'continue';
        }

        var result = hashSplit.filter(function (el, index) {
          return patternSplit[index].charAt(0) === ':' || patternSplit[index] === el;
        });

        if (result.length === patternSplit.length) {
          return {
            v: _this.buildRouteMatch(hashSplit, patternSplit, i)
          };
        }
      };

      for (var i in routeTable) {
        var _ret = _loop(i);

        switch (_ret) {
          case 'continue':
            continue;

          default:
            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }

      return;
    }
  }, {
    key: 'buildRouteMatch',
    value: function buildRouteMatch(hash, route, name) {
      var output = {
        name: name,
        params: {}
      };

      route.forEach(function (value, index) {
        if (value.charAt(0) === ':') {
          output.params[value.substr(1)] = hash[index];
        }
      });

      return output;
    }
  }, {
    key: 'onChange',
    value: function onChange(route) {

      this.changeHandlers.forEach(function (handler) {
        handler(route);
      });
    }
  }, {
    key: 'change',
    value: function change(handler) {
      this.changeHandlers.push(handler);
    }
  }]);

  return Router;
}();

module.exports = new Router();