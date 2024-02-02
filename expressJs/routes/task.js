const express = require('express')
const router = express.Router()

const taskController = require('../controller/task')

router.post('/', taskController.createTask)
    .get("/", taskController.getAllTasks)
    .get("/:id", taskController.getTask)
    .put("/:id", taskController.replaceTask)
    .patch("/:id", taskController.updateTask)
    .delete("/:id", taskController.deleteTask)

module.exports = router;