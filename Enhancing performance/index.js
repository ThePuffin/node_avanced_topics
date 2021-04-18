const express = require("express");
const app = express();
const port = 3000;
const Worker = require("webworker-threads").Worker;

const start = Date.now();

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      postMessage(counter);
    };
  });
  worker.onmessage = function (message) {
    console.log(message.data);
    res.send("" + message.data);
  };
  worker.postMessage();
});
app.get("/fast", (req, res) => {
  res.send(`This is fast`);
});

app.listen(port);
