const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  employee_number: {
    unique: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  speciality: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  band: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  teamId: {
    type: Sequelize.INTEGER,
  },
  availability: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = User;
