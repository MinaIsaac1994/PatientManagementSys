const User = require("../models/user");

const login = async (req, res) => {
  try {
    const user = await User.findByPk("1");
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.send(req.session);
  } catch (error) {
    console.log(error);
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.send({ message: "logged out" });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, logout };
