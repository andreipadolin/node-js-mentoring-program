const fs = require("fs");

const log = (filePath, loggingData) =>
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile(filePath, loggingData, (err) => {
        if (err) throw err;
      });
    } else {
      fs.appendFile(filePath, loggingData, (err) => {
        if (err) throw err;
      });
    }
  });

module.exports = {
  log,
};
