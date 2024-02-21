const express = require("express");
const router = express.Router();

const getUser = async (username) => {
  return { username: username, password: "1234", userId: 123 };
};

router.get("/", (req, res) => {
  try {
    res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  try {
    const { username, password } = req.body;
    const user = getUser(username);

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.redirect("/welcome");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
