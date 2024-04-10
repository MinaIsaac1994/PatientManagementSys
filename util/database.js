const Sequelize = require("sequelize");
const session = require("express-session");
const Store = require("express-sequelize-session")(session.Store);
const sequelize = new Sequelize("therapies", "root", "123456", {
  dialect: "mysql",
  host: "localhost",
});

const sessionOptions = {
  name: "sid",
  resave: false,
  secret: "my_secret_key",
  saveUninitialized: false,
  store: new Store(sequelize),
  cookie: {
    // sameSite: "strict",
  },
};

module.exports = { sequelize, sessionOptions };
