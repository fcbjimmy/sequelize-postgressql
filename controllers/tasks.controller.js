const Task = require("../models/Task");
const Tasks = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTasks = async (req, res) => {
  try {
    const { name, done, projectId } = req.body;
    const newTask = await Tasks.create({
      name,
      done,
      projectId,
    });
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
      // attributes: ["name"], con este atributo solo nos devuelve el campo 'name' y sin atributo nos devuelve el objeto completo
    });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done } = req.body;
    const updatedTask = await Task.findOne({
      where: { id },
    });
    updatedTask.set(req.body);
    await updatedTask.save();
    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: { id },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTasks, getTask, updateTask, deleteTask };
