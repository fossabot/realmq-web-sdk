'use strict';

function _throwErrorDelayed(e) {
  setTimeout(function() {
    throw e;
  }, 0);
}

module.exports = {
  emit: function(args) {
    var event = args.event;
    var listeners = args.listeners;
    var data = args.data;
    var eventListeners = listeners[event];

    if (Array.isArray(eventListeners)) {
      var numberOfListeners = eventListeners.length;

      for (var i = 0; i < numberOfListeners; i++) {
        try {
          eventListeners[i](data);
        } catch (e) {
          _throwErrorDelayed(e);
        }
      }
    }
  },

  on: function(args) {
    var listeners = args.listeners;
    var handler = args.handler;
    var event = args.event;
    var eventListeners = listeners[event];

    if (Array.isArray(eventListeners)) {
      if (eventListeners.indexOf(handler) !== -1) {
        throw new Error(
          'An identical listener for event: ' +
            event +
            ' is already registered.'
        );
      }

      eventListeners.push(handler);
    } else {
      listeners[event] = [handler];
    }
  },

  off: function(args) {
    var listeners = args.listeners;
    var event = args.event;
    var handler = args.handler;
    var eventListeners = listeners[event];

    if (Array.isArray(eventListeners)) {
      var index = eventListeners.indexOf(handler);

      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
};
