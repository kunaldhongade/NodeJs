const express = require("express");
const { LocalStorage } = require("node-localstorage");

const app = express();
global.localStorage = new LocalStorage("./scratch");

app.use(express.json());

app.get("/", (req, res) => {
  try {
    console.log("Started");
    localStorage.setItem("name", "John Doe");

    const value = localStorage.getItem("name");
    console.log(value);

    // localStorage._deleteLocation();

    console.log(value);
    res.status(201).json({ name: value });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
