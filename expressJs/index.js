require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const quoteRouter = require("./routes/quote");
const server = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");

// console.log(process.env.DB_PASSWORD);
//db connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// we can call it API also Endpoint & Route

// there is also a thing called middle
// before request reaches to server it passes through middle
// we can use middle to modify request object
// it is common backend concept

/**
 * Execute any code
 * Make changes to the request and the response object
 * End the request-response cycle
 * call the next middleware in the stack.
 * eg. authentication / check for country ip
 */

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "public.key"),
  "utf-8"
);
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      console.log("no token its ", token);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    token.split("Bearer ")[1];
    // console.log(token);

    let decoded = jwt.verify(token, publicKey);

    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized", error });
  }
};

server.use(cors());

// built in middleware
// this is called body parser
server.use(express.json()); // to read json data
server.use(express.urlencoded({ extended: true })); // to read form data
server.use(morgan("tiny")); // this is logger middleware

// server.use(express.static(process.env.PUBLIC_DIR)); // to serve static files
server.use(express.static(process.env.BUILD_DIR)); // to serve static files

server.use("/products", auth, productRouter); // this is router middleware
server.use("/auth", authRouter);
server.use("/users", auth, userRouter);
server.use("/task", taskRouter);
server.use("/quotes", quoteRouter);

server.get("/query", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const age = req.query.age;
  const subject = req.query.subject;
  console.log(
    `${name} is ${age} years old and completed studies in ${subject}`
  );
  res.send(req.query);
});

server.get("/dParams/:name/:age/:subject", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  const subject = req.params.subject;

  const result = `${name} is ${age} years old and completed studies in ${subject}`;

  console.log(result);
  res.send(req.params);
});
// custom middleware
// this is application middleware for whole application
// server.use((req, res, next) => {
//     console.log(req)
//     console.log(req.method, req.ip, req.hostname, req.url, req.get('User-Agent'), new Date())

//     next()
//     // next is used to send control to others

//     // this is logger middleware
// })

// middleware can be specific to route also

// query is path/?password=123
// this is query

// server.use(auth) this will be applied to all routes

server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html")); // dirname for absolute name
}); // if path is not found then search in react
// * wildcard is used to select all
// we are on server it does know react file and then react has its own router
// * means path that not in server so it look into react

server.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
