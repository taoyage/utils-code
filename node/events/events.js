function EventEmitter() {
  this._events = {};
  this._maxListeners = 10;
}

EventEmitter.prototype.setMaxListener = function(maxListeners) {
  this._maxListeners = maxListeners;
};

EventEmitter.prototype.listeners = function(event) {
  return this._events[event];
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener) {
  if (this._events[type]) {
    this._events[type].push(listener);
    if (this._maxListeners !== 0 && this._events[type].length > this._maxListeners) {
      console.error(
        `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${
          this._events[type].length
        } ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
      );
    }
  } else {
    this._events[type] = [listener]; 
  }
};

EventEmitter.prototype.once = function(type, listener) {
  const wrapper = (...rest) => {
    listener.apply(this, rest);
    this.removeListener(type, wrapper);
  };
  this.on(type, wrapper);
};

EventEmitter.prototype.emit = function(type, ...rest) {
  if (this._events[type]) {
    this._events[type].forEach(listener => {
      listener.apply(this, rest);
    });
  }
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if (this._events[type]) {
    this._events[type] = this._events[type].filter(l => l !== listener);
  }
};

EventEmitter.prototype.removeAllListener = function(type) {
  delete this.events[type];
};

module.exports = EventEmitter;
