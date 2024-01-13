const mongoose = require('mongoose')
const { Schema } = require('mongoose')

// schema is configuration of collection
const productSchema = new Schema({
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: { type: String, required: true },
    price: { type: Number, min: [0, "Price cannot be negative"] },
    discountPercentage: { type: Number, min: [0, "Discount cannot be negative"], max: [100, "Discount cannot be greater than 100"] },
    rating: { type: Number, min: [0, "Rating must be greater than 0"], max: [5, "Rating must be less than 5"] },
    // stock: Number,
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
})

// model is collection. Schema is configuration to create model class
exports.Product = mongoose.model('Product', productSchema)
// model name is Product and collection name will be products
//model things are always singular
// model combines schema and collection
// we can create many models for different collections in same db or different db also but we need to connect to db first before creating model or schema or collection or document

// document is instance of model class 
// document is row in collection 
// document things are always plural
// we can perform CRUD operations on document using model (Product)
// we can create document using model
