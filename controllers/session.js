const User = require("../models/user");

const handleUserSession = async (req, res, next) => {
  try {
    // const userId = req.session?.user?.id ?? null;
    const userId = true;
    if (userId) {
      // change this when you create the login page
      const user = await User.findByPk("1");
      req.user = user;
      req.session.isLoggedIn = true;
      await req.session.save();
      next();
    } else {
      req.session.isLoggedIn = false;
      throw Error("You need to login");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleUserSession };
