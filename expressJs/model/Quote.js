const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const quoteSchema = new Schema({
  rank: {
    type: Number,
    required: true,
    unique: true,
  },
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

exports.Quote = mongoose.model("Quote", quoteSchema);
