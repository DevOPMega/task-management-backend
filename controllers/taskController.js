const Task = require("../models/task");
const User = require("../models/user");

class TaskController {
  async getTask(req, res) {
    // get user id
    const uid = req.uid;
    try {
      const username = await User.findOne({ uid }, "name").exec();
      const userTasks = await Task.find({ uid });
      console.log("fetching task...");
      return res.status(200).json({
        username,
        userTasks,
      });
    } catch (error) {
      console.log("error in get task");
      console.log("error: ", error);
      return res.status(500).json({
        message: "failed to get task",
      });
    }
  }
  async addTask(req, res) {
    // collect the data
    const { title, description, status, priority, deadline } = req.body;
    // validate the data
    if (!title || !status) {
      return res.status(400).json({
        message: "Lack of Suffecient Data",
      });
    }
    // save the data
    try {
      const newTask = new Task({
        uid: req.uid,
        title,
        description: description || "",
        status: status || "To Do",
        priority: priority || "Low",
        deadline,
      });
      await newTask.save();
      res.status(201).json({
        message: "Task Created Successfully",
      });
    } catch (error) {
      console.log("Error in add task");
      console.log("Error: ", error);
      return res.json({
        message: "Error in Creating Task",
      });
    }
  }
  async updateTask(req, res) {
    // get task id
    const { id, title, description, status, priority, deadline } = req.body;
    const task = await Task.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        status,
        priority,
        deadline,
      }
    );
    res.status(201).json({
      message: "Updated Successfully",
    });
  }
  deleteTask(req, res) {}
}

module.exports = new TaskController();
