import express from "express";
import books from "./books-data.js";

const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hello from the root path!" });
});

export default app;