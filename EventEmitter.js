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

  removeEventListener(eventName, fn) {
    return this.off(eventName, fn);
  }

  once(eventName, fn) {}

  emit(eventName, ...args) {}

  listenerCount(eventName) {}

  rawListeners(eventName) {}
};
