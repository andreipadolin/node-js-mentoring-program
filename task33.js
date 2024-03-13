const csvFilePath = "./csv/books.csv";
const txtResultFilePath = "./txt/resultOfCSVConversion.txt";

const fs = require("fs");
const txtWriteStream = fs.createWriteStream(txtResultFilePath);
const csvToJson = require("csvtojson");

csvToJson()
  .fromFile(csvFilePath)
  .on("header", (header) => {
    console.log("header :>> ", header);
  })
  .on("data", (data) => {
    const jsonStr = data.toString("utf8");
    console.log("read line :>> ", jsonStr);
    txtWriteStream.write(`${jsonStr}`, (err) => {
      if (err) {
        console.error("csvToJson: error writing line to TXT file:", err);
      }
    });
  })
  .on("done", (error) => {
    if (error) {
      console.error("csvToJson: error writing to TXT file:", error);
    } else {
      console.log("csvToJson: writing completed");
      txtWriteStream.end();
    }
  })
  .subscribe((json) => {
    return new Promise((resolve, reject) => {
      if (json) {
        resolve(json);
      } else {
        reject(json);
      }
    });
  });

txtWriteStream.on("finish", () => {
  console.log("TxtWriteStream: writting completed");
});

txtWriteStream.on("error", (err) => {
  console.error("TxtWriteStream: error writing to TXT file:", err);
});
