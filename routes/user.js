const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserProjects,
} = require("../controllers/user.controller");
const { saveUser } = require("../middlewares/userAuth");

router.route("/signup").post(saveUser, signup);
router.route("/login").post(login);
router.route("/user/:id/projects").get(getUserProjects);
module.exports = router;
