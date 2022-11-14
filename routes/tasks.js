const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

router.route("/tasks").get(getTasks);
router.route("/tasks").post(createTasks);
router.route("/tasks/:id").put(updateTask);
router.route("/tasks/:id").delete(deleteTask);
router.route("/tasks/:id").get(getTask);

module.exports = router;
