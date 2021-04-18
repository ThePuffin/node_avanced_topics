const express = require("express");
const app = express();
const port = 3000;

const start = Date.now();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send(`Server listen the port :${port}`);
  });
});
app.get("/fast", (req, res) => {
  res.send(`This is fast`);
});

app.listen(port);
