require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const server = express();

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

server.use(cors());

// built in middleware
// this is called body parser
server.use(express.json()); // to read json data

server.use(morgan("combined")); // this is logger middleware

// server.use(express.static(process.env.PUBLIC_DIR)); // to serve static files
server.use(express.static(process.env.BUILD_DIR)); // to serve static files

server.use("/products", productRouter); // this is router middleware
server.use("/users", userRouter);
server.use("/task", taskRouter);

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

const auth = (req, res, next) => {
  // console.log(req.query)
  if (req.body.password == "123") {
    // we need express.json() to access body object normally it cant read json we need to use middleware
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

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
