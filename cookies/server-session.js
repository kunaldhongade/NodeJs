const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const Schema = mongoose.Schema;
app.use(
  session({
    secret: "abcdef-123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 },
  })
);

app.get("/", (req, res) => {
  try {
    console.log("hello world");
    res.json("Welcome to session management");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/test", (req, res) => {
  try {
    console.log(req.session.test);
    req.session.test ? req.session.test++ : (req.session.test = 1);
    res.status(200).send(req.session.test.toString());
  } catch (error) {
    res.status(500).json(error);
  }
});

mongoose
  .connect("mongodb://localhost:27017/session")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
