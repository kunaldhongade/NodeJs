const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('./index.html', 'utf-8') // used to read file

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

const products = data.products;


const server = http.createServer((req, res) => {

    console.log(req.url, req.method)

    if (req.url.startsWith('/product')) {
        const id = req.url.split('/')[2]

        const product = products.find((p) => p.id == (+id)) // +id covert id to number
        console.log(product)
        res.setHeader('Content-Type', 'text/html')
        let modifiedIndex = index
            .replace('**title**', product.title)
            .replace('**url**', product.thumbnail)
            .replace('**price**', product.price)
            .replace("**rating**", product.rating)
        res.end(modifiedIndex);
        return;
    }

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.end(index);
            break;

        case '/api':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data));
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(`<h1>404 Page Not Found</h1>`)
    }

    // console.log("server started");
    // res.setHeader('Dummy', "dummyValue")
    // // res.end(`<h1>Hello</h1>`)

    // // res.setHeader('Content-Type', 'application/json')
    // // it tells browser that we are sending json object 
    // // res.end(JSON.stringify(data)) // json.stringify convert object into string
    // // res.end allows only string

    // // To send any data / file we need to setHeader
    // // res.setHeader("Content-Type", "application/json")

    // res.end(index) // sending res from index.html file
    // // res.end(data)
})

server.listen(8081)

const server2 = http.createServer((req, res) => {
    res.end(`<h1>Server 2</h1>`)
})
server2.listen(8082)