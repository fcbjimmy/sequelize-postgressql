const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Project = require("./Project");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true, //checks for email format
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = User;

User.hasMany(Project, {
  foreignKey: "userId",
  sourceKey: "id",
});

Project.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});
