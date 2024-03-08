require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/User");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "abcdef-123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);
    try {
      const user = await User.findOne({ username: username });
      // console.log(user);
      if (!user) {
        console.log("Incorrect username.");
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password === password) {
        console.log(user);
        return done(null, user); // done needs severalized user
      }
      console.log("Incorrect password.");
      return done(null, false, { message: "Incorrect password." });
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  if (user) {
    return done(null, user.id);
  }
  return done(null, false);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(err, false);
  }
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
