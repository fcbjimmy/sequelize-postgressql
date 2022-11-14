const express = require("express");
const sequelize = require("./database/database");
const app = express();
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1", projectRoutes);
app.use("/api/v1", taskRoutes);

//port
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
