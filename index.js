const express = require("express");
const sequelize = require("./database/database");
const app = express();
require("./models/Project.js");
require("./models/Task.js");
app.get("/", (req, res) => {
  res.send("hello world");
});

//port
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
