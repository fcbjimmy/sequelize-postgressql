const Sequelize = require("sequelize");

const sequelize = new Sequelize("projectsdb", "postgres", "sport1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
