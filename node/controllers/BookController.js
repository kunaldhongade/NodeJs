const connect = require("../database/db")
const { ObjectId } = require("mongodb")
const Book = require("../models/Book")

exports.index = async (req, res) => {
    // const db = await connect();
    // const books = await db.collection('book').find().toArray()
    const books = await Book.find();
    res.json(books)
}

exports.create = async (req, res) => {
    // console.log(req.body)
    // res.json(req.body)
    // const db = await connect();
    // await db.collection('books').insertOne(data)
    // await db.collection('book').insertOne(req.body)

    try {
        await Book.create(req.body)
        res.status(201).json({ data: "book is stored" })
    } catch (error) {
        res.json(error.errors)
    }

}

exports.put = (req, res) => {
    res.send("put all books")
}

exports.show = async (req, res) => {
    // const db = await connect();
    const _id = new ObjectId(req.params.id)
    // const book = await db.collection('book').find({ _id }).toArray()

    const book = await Book.find({ _id })
    res.json(book)
    // console.log(req.params)
    // res.send(`book id is ${req.params.id}`)
}

exports.update = async (req, res) => {
    // const db = await connect();
    const _id = new ObjectId(req.params.id)
    // await db.collection('book').updateOne({ _id }, { $set: req.body })

    await Book.updateOne({ _id }, { $set: req.body })

    res.json({ 'data': `${_id} book is updated` })
}

exports.delete = async (req, res) => {
    // const db = await connect();
    const _id = new ObjectId(req.params.id)
    // await db.collection('book').deleteOne({ _id })

    await Book.deleteOne({ _id })
    res.status(204).json()
}