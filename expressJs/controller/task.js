const { json } = require("express");
const { Task } = require("../model/Task");

exports.createTask = async (req, res) => {
  try {
    let task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    res.status(203).json(task);
  } catch (error) {
    res.status(400), json(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(203).json(doc);
  } catch (error) {
    res.status(400), json(error);
  }
};

exports.replaceTask = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Task.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Task.findOneAndDelete({ _id: id });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
