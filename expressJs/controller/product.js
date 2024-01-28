const data = require('../data.json')
const products = data.products;
const { Product } = require('../model/Product')

// MVC model view controller
// data is model
// business rule 

// view is how we show data to user

// controller is how we control data (model and view changes path)
// all logic in controller

// exports.createUser = async (req, res) => { // this is controller logically
//     // const product = req.body
//     // console.log(product)
//     // products.push(product)

//     const product = new Product(req.body);
//     // product.title = "Phone X";
//     // product.price = 9999;
//     // product.description = "This is a good phone";
//     // product.rating = 4.5;
//     // // we do not declare img but its initialize because arrays default value is empty array
//     await product.save()
//     res.status(201).json(product)
// }

exports.createUser = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getProduct = async (req, res) => {
    // const id = +req.params.id
    // const product = products.find(product => product.id === id)
    // res.json(product)

    try {
        const id = req.params.id
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.replaceProduct = async (req, res) => {
    // const id = +req.params.id
    // const productIndex = products.findIndex(product => product.id === id)
    // products.splice(productIndex, 1, { ...req.body, id })
    // // change to which index, what to delete, new obj to replace
    // res.status(200).json({ 1: "updated" });

    try {
        const id = req.params.id;
        const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(202).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateProduct = async (req, res) => {
    // const id = +req.params.id
    // const productIndex = products.findIndex(product => product.id === id)
    // const product = products[productIndex]
    // products.splice(productIndex, 1, { ...product, ...req.body })
    // // change to which index, number of elements to delete, this will replace property of product by req.body only mentioned get replaced

    // res.status(200).json({ 1: "updated" });

    try {
        const id = req.params.id;
        const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(202).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteProduct = async (req, res) => {
    // const id = +req.params.id
    // const index = products.findIndex(product => product.id === id)
    // const product = products[index]
    // products.splice(index, 1)
    // res.status(204).json(product)

    try {
        const id = req.params.id;
        const doc = await Product.findByIdAndDelete(id);
        res.status(204).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

