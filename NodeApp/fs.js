// import fs from 'fs';
const fs = require('fs');

const t1 = performance.now()

// const txt = fs.readFileSync("./demo.txt", "utf-8")
const fsReturn = fs.readFile("./demo.txt", "utf-8", (err, txt) => {

    if (err) {
        console.log("error")
        return
    }
    console.log(txt)
})
// read file sync shows in instance

// every node callback fist arg always err

console.log("✋✋✋ this is the text: lst line")
console.log(fsReturn)

const t2 = performance.now()

console.log(t2 - t1)