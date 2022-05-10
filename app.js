import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the root path!" });
});

export default app;
