'use strict';

// Simple event emitter.

module.exports = {

  _events: {},

  // Create an event handler
  on: function on(key, handler) {

    var ev = this._events[key] || (this._events[key] = []);

    if (ev.indexOf(handler) !== -1) return;

    ev.push(handler);
  },

  // Call an event
  out: function out(key) {

    var ev = this._events[key];

    if (!ev) return;

    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < ev.length; i++) {

      ev[i].apply(this, data);
    }
  },

  // Remove an event handler
  off: function off(key, handler) {

    var ev = this._events[key];

    if (!ev) return;

    var idx = ev.indexOf(handler);

    if (idx !== -1) {

      ev.splice(idx, 1);
    }

    if (ev.length === 0) {

      delete this._events[key];
    }
  }
};