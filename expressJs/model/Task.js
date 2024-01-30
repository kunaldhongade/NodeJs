const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, require: true },
  status: { type: Boolean, require: true },
  date: { type: Date, default: Date.now, require: true },
});

exports.Task = mongoose.model("Task", taskSchema);
