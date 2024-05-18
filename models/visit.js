const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const Visit = sequelize.define("visit", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATE,
  },
});

module.exports = Visit;
