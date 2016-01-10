'use strict';

let RouteTable = require('./config').Routes;
let State = require('./state');

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
    let hash = '/' + window.location.hash;

    this.changeRoute(hash, this.findRoute(window.location.hash.substr(1)));
  }

  changeRoute (hash, route) {
    var appState = State.get();
    if(!route) {

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

  findRoute (hash) {
    let filter = (v) => {
      return v.trim().length > 0;
    };

    let hashSplit = hash.split('/').filter(filter);

    for(let i in RouteTable) {
      let patternSplit = RouteTable[i].split('/').filter(filter);

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

  onChange (route) {

    this.changeHandlers.forEach(
      handler => {
        handler(route);
      });
  }

  change (handler) {
    this.changeHandlers.push(handler);
  }
}

module.exports = new Router();
