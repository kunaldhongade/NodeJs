const Circle = require('./circle.js')

const circle = new Circle();
console.log(circle.area(5))
console.log(circle.circumference(5))

// global is ultimate and everything in node store in global object

console.log(global)
console.log(global.process.env.PWD)
console.log(global.__dirname)// it returns undefined

// these objects are available in all modules. The following variables may appear to be global but are not. They exist only in the scope of modules, see the module system documentation: 

/**
 * 
 * 1. __dirname
 * 2. __filename
 * 3. exports
 * 4. module
 * 5. require()
 *  
 */

console.log(__dirname) // means this is not global object
console.log(__filename)
console.log(module.exports)