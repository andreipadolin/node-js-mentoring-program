const os = require("os");
const childProcess = require("child_process");

const getOSPlatform = () => os.platform();
const getCommandBasedOnOSPlatform = (platformName) => {
  switch (platformName) {
    case "linux":
    case "darwin":
      return `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
    case "win32":
      return `Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }`;
    default:
      throw new Error("Platform not supported");
  }
};

// const printInSameLine = (progress) => {
//   process.stdout.clearLine(0);
//   process.stdout.cursorTo(0);
//   process.stdout.write(progress);
// };

const execProcess = (command, callback) => {
  if (os.platform() === "win32") {
    childProcess.exec(
      command,
      { shell: "powershell.exe" },
      (error, stdout, stderr) => {
        if (error !== null) {
          callback(stderr, null);
        } else {
          callback(null, stdout);
        }
      }
    );
  } else {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error !== null) {
        callback(stderr, null);
      } else {
        callback(null, stdout);
      }
    });
  }
};

module.exports = {
  getOSPlatform,
  getCommandBasedOnOSPlatform,
  // printInSameLine,
  execProcess,
};
