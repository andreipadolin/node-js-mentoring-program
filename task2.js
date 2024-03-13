const utils = require("./utils");
const logger = require("./logger");
const filePath = "activityMonitor.log";

const osPlatformName = utils.getOSPlatform();
const command = utils.getCommandBasedOnOSPlatform(osPlatformName);

const consoleLoggingInterval = 100; //  values of 100 force system lags on win
const fileLoggingInterval = 6000;
let ticks = 0;

setInterval(() => {
  utils.execProcess(command, (err, res) => {
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
