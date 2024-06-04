const Sequelize = require("sequelize");
const { sequelize } = require("../util/database");

const Patient = sequelize.define("patients", {
  nhs_number: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.BIGINT,
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
  active: {
    type: Sequelize.BOOLEAN,
  },
  attributes: {
    type: Sequelize.JSON,
  },
  address: {
    type: Sequelize.STRING,
  },
  area: {
    type: Sequelize.STRING,
  },
  details: {
    type: Sequelize.STRING,
  },
  specificity: {
    type: Sequelize.STRING,
  },
  diagnosis: {
    type: Sequelize.STRING,
  },
});

module.exports = Patient;
