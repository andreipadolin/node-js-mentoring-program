const WithTime = require("./WithTime");
const https = require("https");

const fetchFromUrl = (url, cb) => {
  https
    .get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        cb(null, JSON.parse(data));
      });
    })
    .on("error", (error) => {
      cb(error);
    });
};

const withTime = new WithTime();

withTime.on("start", () => console.log("About to execute"));
withTime.on("data", (value) => console.log("Async func results:", value));
withTime.on("end", (time) => console.log("Done with execute:", time));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/3");

console.log("rawListeners", withTime.rawListeners("end"));