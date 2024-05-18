const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const Team = sequelize.define("team", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  attributes: {
    type: Sequelize.JSON,
  },
});

module.exports = Team;
