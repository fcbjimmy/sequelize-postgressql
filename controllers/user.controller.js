const User = require("../models/User");
const Project = require("../models/Project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createJWT } = require("../utils/jwt");
const comparePasswords = require("../utils/comparePassword");
//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);
    console.log(user);
    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated

    let token = createJWT(user);

    res.status(200).json({ name, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({ email });
    console.log(user);

    //if user email is found, compare password with bcrypt
    if (!user) {
      throw new Error("user not found");
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      throw new Error("Password does not match");
    }

    let token = createJWT(user);
    res
      .status(200)
      .json({
        user: { name: user.name, email: user.email, userId: user.id },
        token,
      });
  } catch (error) {
    console.log(error);
  }
};

const getUserProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Project.findAll({
      where: { userId: id },
    });
    res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  signup,
  login,
  getUserProjects,
};
