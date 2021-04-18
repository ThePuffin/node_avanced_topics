const cluster = require("cluster");
/*I the file beging executed in master mode ?*/
if (cluster.isMaster) {
  // cause index.js to be executed *again* but in child mode
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  //i'm a child, i'm going to act like a server and do nothing else
  const express = require("express");
  const app = express();
  const port = 3000;

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send(`Server listen the port :${port}`);
  });
  app.get("/fast", (req, res) => {
    res.send(`This is fast`);
  });

  app.listen(port);
}
