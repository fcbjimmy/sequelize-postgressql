const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Task = require("./Task");

const Project = sequelize.define(
  "projects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Project;

Project.hasMany(Task, {
  foreignKey: "projectId",
  sourceKey: "id",
  onDelete: "cascade",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
  targetId: "id",
  onDelete: "cascade",
});

// Project.associate = (models) => {
//   Project.hasMany(models.Task);
// };
