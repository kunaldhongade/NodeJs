const http = require("http") // we also use require("node:http")
// const { area } = require('./circle.js')
const fs = require("fs")

const PORT = 3000;

const func1 = () => console.log("this is func1")
const func2 = () => console.log("this is func2")
const func3 = () => {
    console.log("this is func3")
    setTimeout(() => {
        func1()
    }, 0);

    process.nextTick(() => { // once everything is done from call stack then it will run
        console.log("i am next tick")
    })

    new Promise((resolve, reject) => {
        resolve("this is promise");
    }).then((res) => console.log(res))
    func2()
}

func3()

// next tick run before promise and settimeout

// mini task -> nextTick
// micro task -> promise
// macro task -> settimeout, setInterval


const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === "/") { // this is called routing endpoint

        // res.writeHead(200, { "content-type": "application/json" })
        // res.end(
        //     JSON.stringify({
        //         data: "hello world!"
        //     })
        // )

        res.writeHead(200, { "content-type": "text/html" })

        // file system in node js
        fs.readFile("page/home.html", "utf-8", (err, data) => {
            if (err) throw err;
            res.write(data)
            res.end()
        })

    } else if (req.url === "/about") {
        // res.writeHead(200, { "content-type": "application/json" })

        // here we return json directly
        // res.end(
        //     JSON.stringify({
        //         data: "about page!"
        //     })
        // )

        // // here we return html directly
        // res.writeHead(200, { "content-type": "text/html" })
        // res.write("<h1>about page!</h1>")
        // res.end();

        res.writeHead(200, { "content-type": "text/html" })
        fs.readFile("page/about.html", "utf-8", (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        })

    }
    else if (req.url === "/list") {

        res.writeHead(200, { "content-type": "text/html" })
        fs.readFile("temp/test.html", "utf-8", (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        })

    }
    else if (req.url === "/create-file-m") {
        res.writeHead(200, { "content-type": "text/html" });
        const data = `<h1>this is big test file</h1>`

        for (let i = 0; i < 100000; i++) {
            fs.appendFile("temp/testBigFile.html", data, (err) => {
                if (err) throw err;
                console.log("file is created successfully");
            })
        }
        res.write("file is created successfully");
        res.end();
    }

    else if (req.url === "/create-file") {
        res.writeHead(200, { "content-type": "text/html" })
        // to add text in file we need to use appendFile
        fs.appendFile(
            // fs.writeFile( // it replace content of file if file is already exist
            "temp/test.html",
            "<h1>This is test file</h1>",
            (err) => {
                if (err) throw err;
                res.write("file is created successfully");
                res.end();
            })
    }
    else {
        // res.writeHead(404, { "content-type": "application/json" })
        res.writeHead(404, { "content-type": "text/html" })
        // res.end(
        //     JSON.stringify({
        //         data: "page not found!"
        //     })
        // )

        // res.write("<h1>page not found!</h1>")
        // res.end()

        fs.readFile("page/404.html", "utf-8", (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        })
    }
})
// console.log(area(5));

console.log(`server is running at http://localhost:${PORT}`)
server.listen(PORT) // server is running process but it will not stop


//  if we do run this way we need to stop server manually and restart it
// so we use nodemon
// nodemon auto restart server when we make changes