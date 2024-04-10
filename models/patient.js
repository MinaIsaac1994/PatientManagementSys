const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const Patient = sequelize.define("patients", {
  nhs_number: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  EngagementCount: {
    type: Sequelize.INTEGER,
  },
  PendingCount: {
    type: Sequelize.INTEGER,
  },
  DOB: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Patient;
