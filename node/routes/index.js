const express = require("express")
const router = express.Router()
const EventEmitter = require('events')
const myEvent = new EventEmitter()
const bookRouter = require("./book")
const path = require('path') // to create absolute path

myEvent.on("test-event", (data) => {
    console.log("this event is listing");
    console.log(data)
})

router.get('/', (req, res) => { // this is endpoint
    // myEvent.emit("test-event", { name: "test" })
    // res.send("hello world!")
    // console.log(path.join(__dirname, "/../page/home.html"))
    res.sendFile(path.join(__dirname, "/../page/home.html"), { name: "kunal" })

    res.render('index', { name: "kunal" })

})

router.post('/', (req, res) => {
    res.json({ data: "hello world from post method" })
})

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/../page/about.html"))
})

router.use("/book", bookRouter)

router.all("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../page/404.html"))
})

module.exports = router