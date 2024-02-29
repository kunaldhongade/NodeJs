const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    unique: true,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

exports.Task = mongoose.model("Task", taskSchema);
