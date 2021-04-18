process.env.UV_THREADPOOL_SIZE = 1;

//to test in terminal: ab -c 1 -n 1 localhost:3000/fast to make a request
const cluster = require("cluster");
const crypto = require("crypto");

/*I the file beging executed in master mode ?*/
if (cluster.isMaster) {
  // cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  //i'm a child, i'm going to act like a server and do nothing else
  const express = require("express");
  const app = express();
  const port = 3000;

  const start = Date.now();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      // console.log("1", Date.now() - start);
      res.send(`Server listen the port :${port}`);
    });
  });
  app.get("/fast", (req, res) => {
    res.send(`This is fast`);
  });

  app.listen(port);
}
