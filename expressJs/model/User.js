const mongoose = require("mongoose")
const { Schema } = require('mongoose');
const validateEmail = require('../validators/validateEmail')
const validatePhoneNumber = require('../validators/validateMobileNumber')

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please fill Your First Name"],
        max: [16, "First Name should be in 16 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        max: [16, "Last Name should be in 16 characters"]
    },
    age: {
        type: Number,
        min: [12, "Age should be greater than 12"],
        max: [100, "Age should not be over 100"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        require: [true, "please fill Phone number"],
        validate: [validatePhoneNumber, "Please fill a valid Phone number"]
    },
    address: new mongoose.Schema({
        pincode: {
            type: Number,
            required: true,

        },
        street: {
            type: String,
            require: true
        }
    })
})

exports.User = mongoose.model("User", userSchema)
