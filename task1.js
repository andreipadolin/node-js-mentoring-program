const EventEmitter = require("./EventEmitter");

const customEventEmitter = new EventEmitter();

customEventEmitter.addListener("abc", () => {});
customEventEmitter.addListener("abc1", () => {});
customEventEmitter.addListener("abc", () => {});
