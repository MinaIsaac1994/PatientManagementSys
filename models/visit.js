const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const Visit = sequelize.define("visit", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ward: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  team: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Visit;
