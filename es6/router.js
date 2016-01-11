'use strict';

let Config = require('./config');
let State = require('./state');
let Dispatcher = require('./dispatcher');

class Router {

  constructor () {
    this.changeHandlers = [];
    this.readCurrentRoute();

    window.addEventListener('hashchange', this.readCurrentRoute.bind(this));
  }

  navigate (value, params) {
    let hash = this.replaceParams(value, params);

    window.location.hash = '/' + hash;
  }

  hashify (value, params) {
    let hash = '/#/' + value;

    return this.replaceParams(hash, params);
  }

  replaceParams (value, params) {
    if(!params) {
      return value;
    }

    for(let i in params) {
      value = value.replace(':' + i, params[i]);
    }

    return value;
  }

  readCurrentRoute () {
    let hash = '/' + window.location.hash,
        route = this.findRoute(window.location.hash.substr(1));

    Dispatcher.fire(this.getChangeRouteAction(), { hash: hash, route: route });
  }

  getChangeRouteAction () {
    let action = function(state, params) {
      return new Promise((resolve) => {
        state.route = params.route;

        let routeFound = Boolean(params.route);

        state.route = routeFound ? params.route : {};
        state.route.hash = params.hash;
        state.route.found = routeFound;

        resolve();
      });
    };

    action.actionName = 'ChangeRoute';

    return action;
  }

  findRoute (hash) {
    let filter = (v) => {
      return v.trim().length > 0;
    };

    let hashSplit = hash.split('/').filter(filter);
    let routeTable = Config.getRoutes();

    for(let i in routeTable) {
      let patternSplit = routeTable[i].split('/').filter(filter);

      if(hashSplit.length !== patternSplit.length) {
        continue;
      }

      let result = hashSplit.filter(
        (el, index) => {
          return patternSplit[index].charAt(0) === ':' ||
                 patternSplit[index] === el;
        });

      if (result.length === patternSplit.length) {
        return this.buildRouteMatch(hashSplit, patternSplit, i);
      }
    }

    return;
  }

  buildRouteMatch (hash, route, name) {
    let output = {
      name: name,
      params: {}
    };

    route.forEach(
      (value, index) => {
        if(value.charAt(0) === ':') {
          output.params[value.substr(1)] = hash[index];
        }
      });

    return output;
  }
}

module.exports = new Router();
