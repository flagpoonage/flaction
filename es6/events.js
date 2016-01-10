'use strict';

// Simple event emitter.

module.exports = {

  _events: {},

  // Create an event handler
  on: function(key, handler) {

    let ev = this._events[key] ||
      (this._events[key] = []);

    if (ev.indexOf(handler) !== -1) return;

    ev.push(handler);
  },

  // Call an event
  out: function(key, ...data) {

    let ev = this._events[key];

    if (!ev) return;

    for (let i = 0; i < ev.length; i++) {

      ev[i].apply(this, data);

    }

  },

  // Remove an event handler
  off: function(key, handler) {

    let ev = this._events[key];

    if (!ev) return;

    let idx = ev.indexOf(handler);

    if(idx !== -1) {

      ev.splice(idx, 1);

    }

    if (ev.length === 0) {

      delete this._events[key];

    }

  }
};
