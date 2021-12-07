import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from the root path!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
