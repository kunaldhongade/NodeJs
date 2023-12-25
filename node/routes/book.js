const express = require("express")
const bookRouter = express.Router()
const connect = require("../database/db")

// // dynamic routing parameter
// bookRouter.get("/book", (req, res) => {
//     res.send(" All books")
// })

// bookRouter.post("/book", (req, res) => {
//     res.send({ data: "book is stored" })
// })

const data = {
    title: "Power of Consistency",
    author: "Weldon Long"
}

bookRouter.route("/")
    .get(async (req, res) => {
        const db = await connect();
        res.send("get all books")
    })
    .post(async (req, res) => {
        await db.collection('books'.insertOne(data))
        res.send("post all books")
    })
    .put((req, res) => {
        res.send("put all books")
    })

// / anything come from user is req
// bookRouter.get("/:id", (req, res) => {
//     console.log(req.params)
//     res.send(`book id is ${req.params.id}`)
// })
// these are the endpoints
bookRouter.route('/:id')
    .get((req, res) => {
        console.log(req.params)
        res.send(`book id is ${req.params.id}`)
    })
    .patch((req, res) => {
        res.send(`single book of ID: ${req.params.id} to update`)
    })
    .delete((req, res) => {
        res.send(`single book of ID: ${req.params.id} to delete`)
    })

module.exports = bookRouter;