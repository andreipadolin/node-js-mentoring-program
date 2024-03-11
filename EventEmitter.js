module.exports = class EventEmitter {
  listeners = {}; // Object to store event listeners

  addListener(eventName, fn) {
    if (!eventName) {
      throw new Error("Event name is required");
    }
    if (!fn) {
      throw new Error("Handler is required");
    }
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
    console.log("LISTENERS :>> ", this.listeners);
    return this;
  }

  on(eventName, fn) {
    // if (!this.listeners[eventName]) {
    //   this.listeners[eventName] = [];
    // }
    // this.listeners[eventName].push(fn);
    // console.log("LISTENERS :>> ", this.listeners);
    // return this;
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!eventName) {
      throw new Error("Event name is required");
    }
    if (!fn) {
      throw new Error("Handler is required");
    }

    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.removeListener(eventName, onceWrapper);
    };
    //this.listeners[eventName].push(onceWrapper);
    this.addListener(eventName, onceWrapper);
    return this;
  }

  // not sure about return value
  emit(eventName, ...args) {
    if (!eventName) {
      throw new Error("Event name is required");
    }
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
  }

  listenerCount(eventName) {
    if (!eventName) {
      throw new Error("Event name is required");
    }
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    if (!eventName) {
      throw new Error("Event name is required");
    }
    return this.listeners[eventName] || [];
  }
};
