const express = require("express")
const bookRouter = express.Router()
const connect = require("../database/db")
const ObjectId = require('mongodb').ObjectId;
const BookController = require('../controllers/BookController.js');
const auth = require("../middleware/auth.js");

// // dynamic routing parameter
// bookRouter.get("/book", (req, res) => {
//     res.send(" All books")
// })

// bookRouter.post("/book", (req, res) => {
//     res.send({ data: "book is stored" })
// })

const data = {
    title: "Atomic habits",
    author: "James Clear"
}

// we want to get details of all books from user

bookRouter
    .use(auth)
    .route("/")
    .get(BookController.index)
    .post(BookController.create)
    .put(BookController.put)

// / anything come from user is req
// bookRouter.get("/:id", (req, res) => {
//     console.log(req.params)
//     res.send(`book id is ${req.params.id}`)
// })
// these are the endpoints
bookRouter.route('/:id')
    .get(BookController.show)
    .patch(BookController.update)
    .delete(BookController.delete)

module.exports = bookRouter;