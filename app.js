const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the root path!" });
});

module.exports = app;
