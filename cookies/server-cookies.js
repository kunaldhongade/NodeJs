const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("abcdef-123"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  try {
    const name = req.signedCookies.name;
    const counter = req.cookies.counter;
    console.log(name);
    if (!name) {
      res.cookie("name", "Kunal", { maxAge: 1000 * 15, signed: true });
      res.cookie("counter", 1, { maxAge: 1000 * 15 });
      res.status(200).send("Cookie is set");
    } else {
      res.cookie("counter", parseInt(counter) + 1);
      res.status(200).send(`Cookie is set: ${name} & counter: ${counter}`);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/", (req, res) => {
  try {
    const name = req.body.name;
    const counter = req.cookies.counter;
    res.cookie("name", name, { maxAge: 1000 * 15, signed: true });
    res.cookie("counter", parseInt(counter) + 1, { maxAge: 1000 * 15 });
    res.status(200).send(`Cookie is set: ${name}`);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/", (req, res) => {
  try {
    res.clearCookie("name");
    res.clearCookie("counter");
    res.status(200).send("Cookie is deleted");
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
