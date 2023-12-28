const { Schema, default: mongoose } = require('mongoose')

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return typeof value === 'string';
            },
            message: 'Title must be a string',
        },
    },
    author: {
        type: String,
        require: true,
        validate: {
            validator: function (value) {
                return typeof value === 'string';
            },
            message: 'author must be a string',
        },
    },

})
/// this is type validation in mongoose
module.exports = mongoose.model('Books', BookSchema, "book")

// whenever we use mongoose.model it will create a collection in database with plural form of model name

// when we define model mongoose find collection with plural form of model name