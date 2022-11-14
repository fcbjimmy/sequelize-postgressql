const express = require("express");
const router = express.Router();
const {
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getProjectTasks,
} = require("../controllers/projects.controller");

router.route("/projects").get(getProject);
router.route("/projects").post(createProject);
router.route("/projects/:id").put(updateProject);
router.route("/projects/:id").delete(deleteProject);
router.route("/projects/:id").get(getSingleProject);
router.route("/projects/:id/tasks").get(getProjectTasks);

module.exports = router;
