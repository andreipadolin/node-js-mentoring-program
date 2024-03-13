const EventEmitter = require("./EventEmitter");

module.exports = class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    const startTime = Date.now();
    this.emit("start");

    asyncFunc(...args, (error, data) => {
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        this.emit("data", data);
        const timeframe = Date.now() - startTime;
        this.emit("end", timeframe);
      }
    });
  }
};
