const http = require("http")
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json" })
    res.end(
        JSON.stringify({
            data: "hello world!"
        })
    )
})

server.listen(3000) // server is running process but it will not stop