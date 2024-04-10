const User = require("../models/user");
const Teams = require("../models/team");
const { sequelize } = require("../util/database");
const addUser = async (req, res) => {
  try {
    const {
      name,
      band,
      teamId,
      speciality,
      employee_number,
      availability = true,
    } = req.body;
    const newUser = await User.create({
      band,
      name,
      speciality,
      availability,
      employee_number,
    });
    if (teamId) {
      const teams = await Teams.findAll({
        where: {
          id: teamId,
        },
      });

      const promises = teams.map(async (team) => {
        await newUser.setTeam(team);
      });
      await Promise.all(promises);
    }

    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
  }
};

const editUser = (req, res) => {
  const {
    band: newBand,
    name: newName,
    teamId: newTeamId,
    speciality: newSpeciality,
    availability: newAvailability,
    employee_number: newEmployee_number,
  } = req.body;
  User.findByPk(req.params.id)
    .then((user) => {
      user.name = newName;
      user.band = newBand;
      user.speciality = newSpeciality;
      user.employee_number = newEmployee_number;
      user.teamId = newTeamId;
      user.availability = newAvailability;
      return user.save();
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
};

const deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => res.sendStatus(200))
    .catch((err) => res.sendStatus(428).send(err.ValidationErrorItem.message));
};

const getUserById = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Teams,
          attributes: ["id", "name"], // Specify the columns you want to include from the Team model
          where: {
            id: sequelize.col("user.teamId"), // Match the teamId with the user's teamId
          },
          required: false, // Use false if you want to include users even if they don't have a team
          as: "team",
        },
      ],
      attributes: { exclude: ["teamId"] },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
