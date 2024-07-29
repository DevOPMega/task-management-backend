const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");

router.get("/", TaskController.getTask);
router.post("/", TaskController.addTask);
router.patch("/", TaskController.updateTask);
router.delete("/", TaskController.deleteTask);

module.exports = router;