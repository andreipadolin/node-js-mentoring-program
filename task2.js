const utils = require("./utils");
const logger = require("./logger");
const filePath = "log.txt";

const osPlatformName = utils.getOSPlatform();
const command = utils.getCommandBasedOnOSPlatform(osPlatformName);

const consoleLoggingInterval = 1000; // 1 sec
const fileLoggingInterval = 15000; // 15 sec
let ticks = 0;

setInterval(() => {
  utils.execProcess(command, function (err, res) {
    if (err) {
      throw new Error(`error: ${err}`);
    } else {
      console.clear();
      console.log(res);
      if (ticks > 0 && ticks % fileLoggingInterval === 0) {
        logger.log(
          filePath,
          `<${Math.floor(Date.now() / 1000)}>: ${res.toString()}`
        );
        ticks = 0;
      }
      ticks += consoleLoggingInterval;
    }
  });
}, consoleLoggingInterval);
