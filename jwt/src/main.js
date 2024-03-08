const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const loginRoute = require("./routes/login");
// const addRoute = require("./routes/add");

const PORT = 6000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

app.use("/login", loginRoute);
// app.use("/add", addRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
