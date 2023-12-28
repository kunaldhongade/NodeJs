const { Schema, default: mongoose } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },

})

module.exports = mongoose.model('Users', UserSchema)
