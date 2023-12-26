
const express = require("express")
const app = express()
const PORT = 5000;
const bodyParser = require('body-parser')
const routes = require("./routes/index")


app.set("view engine", "pug")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// console.log(routes)
app.use(routes)



// myEvent.on("test-event", (data) => {
//     console.log("this event is listing");
//     console.log(data)
// })

// // dynamic routing parameter
// app.get("/book", (req, res) => {
//     res.send(" All books")
// })

// app.route("/book")
//     .get((req, res) => {
//         res.send("get all books")
//     })
//     .post((req, res) => {
//         res.send("post all books")
//     })
//     .put((req, res) => {
//         res.send("put all books")
//     })

// // anything come from user is req
// app.get("/book/:id", (req, res) => {
//     console.log(req.params)
//     res.send(`book id is ${req.params.id}`)
// })

// app.post("/book", (req, res) => {
//     res.send({ data: "book is stored" })
// })

// app.get('/', (req, res) => { // this is endpoint
//     myEvent.emit("test-event", { name: "test" })
//     res.send("hello world!")
// })

// app.post('/', (req, res) => {
//     res.json({ data: "hello world from post method" })
// })

// app.all("/*", (req, res) => {
//     res.send("this is 404 page not found")
// })

app.listen(PORT, () => {
    console.log(`server is running on port https://localhost:${PORT}`)
})
