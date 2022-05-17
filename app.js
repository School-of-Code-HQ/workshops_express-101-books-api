const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", function (req, res) {
  res.json({ message: "Hello from the root path!" });
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`)
});
