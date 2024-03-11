const express = require("express");
const routes = express.Router();
const path = require("path");
const passport = require("passport");
const User = require("../models/User");

const isAuthenticated = (req, res, done) => {
  if (req.user) {
    console.log(req.user);
    return done();
  }
  console.log(req.user, "is not authenticated.");
  return res.status(401).redirect("/");
};

routes.get("/", (req, res) => {
  try {
    console.log("You are on the home page.");
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/test", isAuthenticated, (req, res) => {
  try {
    console.log(req.session.test);
    req.session.test ? req.session.test++ : (req.session.test = 1);
    if (req.user === undefined) {
      res.status(200).send(req.session.test.toString());
      return;
    }
    res.status(200).send(req.session.test.toString() + " " + req.user.username);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/login", (req, res) => {
  try {
    console.log("You are on the login page.");
    res.sendFile(path.join(__dirname, "../public/login.html"));
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      console.log("You have successfully logged in.");
      res.sendFile(path.join(__dirname, "../public/welcome.html"));
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
const checkRegistered = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    next();
  }
  console.log("User already exists.");
  res.status(300).redirect("/register");
  return;
};

routes.post(
  "/register",
  passport.authenticate("local", { failureRedirect: "/register" }),
  async (req, res) => {
    try {
      const { username, password, name } = req.body;
      const user = new User({ username, password, name });
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

const isRegistered = (req, res, done) => {
  User.findOne({ username: req.body.username })
    .then((err, user) => {
      if (err) {
        console.log(err);
        return done(null, false, { message: "Error." });
      } else if (user) {
        console.log("User already exists.");
        return res.status(300).redirect("/");
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then((err, user) => {
            if (err) {
              console.log(err);
              return done(null, false, { message: "Error." });
            }
            done(null, user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
      return done();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

routes.post("/registerLocal", isRegistered, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/logout", (req, res) => {
  try {
    req.logout();
    console.log("You have successfully logged out.");
    res.sendFile(path.join(__dirname, "../public/logout.html"));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = routes;
exports.isAuthenticated = isAuthenticated;
