const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const db = "mongodb://localhost:27017/session";

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const connection = mongoose
//   .connect(db, dbOptions)
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const sessionStore = MongoStore.create({
  mongoUrl: db,
  mongoOptions: dbOptions,
  collection: "sessions",
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// this is going to create a session and store it in the database
// session id will be stored in the cookie
// cookie is going to in set cookie header
// every time we make a request to the server, the cookie will be sent to the server
// we can access the session object in the request object

// every time server gets that specific cookie with session id, it get document from db session store and get info with session id

// what for use this session

app.get("/", (req, res) => {
  try {
    if (req.session.viewCount) {
      req.session.viewCount++;
    } else {
      req.session.viewCount = 1;
    }
    console.log(req.session);
    res
      .status(200)
      .send(`You have visited this page ${req.session.viewCount} times.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
