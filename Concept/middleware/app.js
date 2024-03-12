const express = require("express");

const app = express();

app.use(abc);
function abc(res, req, next) {
  console.log("abc middleware 0");
  next();
}

const middleware1 = (req, res, next) => {
  console.log("I am a middleware no 1");
  // const errObj = new Error("I am an error"); // where our middleware do something complex we were making database call or something we not control
  // next(errObj);
  req.customProperty = 100;
  next();
};

const middleware2 = (req, res, next) => {
  console.log("I am a middleware no 2");
  console.log(`The custom property value is : ${req.customProperty}`);
  req.customProperty = 600;
  next();
};

function errorHandler(err, req, res, nextMiddleware) {
  if (err) {
    console.log("I am error handler" + err);
    res.send("<h2>There is a err please try again </h2>");
  }
}

app.use(middleware1); // this is global level middleware
// we can have multiple middleware in app
app.use(middleware2);

const standardExpressCallback = (
  requestObject,
  responseObject,
  nextMiddleware
) => {
  try {
    console.log("i am standard express func");
    responseObject
      .status(200)
      .send(`<h1>Hello, THe value is ${requestObject.customProperty} </h1>`);
  } catch (error) {
    responseObject.status(500).json(error);
  }
};

app.get("/", standardExpressCallback); // we apply middleware to route

((name = "kunal") => {
  console.log(name);
})();

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
