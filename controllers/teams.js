const Teams = require("../models/team");
const User = require("../models/user");
const Ward = require("../models/ward");

const addTeam = async (req, res) => {
  const { name, description, usersId = [], wardsId = [] } = req.body;
  try {
    const team = await Teams.create({
      name,
      description,
    });
    if (usersId.length > 0) {
      const users = await User.findAll({
        where: {
          id: usersId,
        },
      });
      await Promise.all(
        users.map(async (user) => {
          await user.setTeam(team);
        })
      );
    }
    if (wardsId.length > 0) {
      const wards = await Ward.findAll({
        where: {
          id: wardsId,
        },
      });
      await Promise.all(
        wards.map(async (ward) => {
          await ward.setTeam(team);
        })
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const editTeam = (req, res) => {
  const { id, name: newName, description: newDescription } = req.body;
  Teams.findByPk(id)
    .then((team) => {
      team.name = newName;
      team.description = newDescription;
      return team.save();
    })
    .then((result) => res.sendStatus(200))  
    .catch((err) => res.sendStatus(428).send(err.ValidationErrorItem.message));
};

const deleteTeam = (req, res) => {
  const { id } = req.body;
  Teams.findByPk(id)
    .then((team) => {
      return team.destroy();
    })
    .then((result) => res.sendStatus(200))
    .catch((err) => res.sendStatus(428).send(err.ValidationErrorItem.message));
};

const getTeamById = (req, res) => {
  Teams.findByPk(req.params.id)
    .then((team) => {
      res.send(team);
    })
    .catch((err) => console.log(err));
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Teams.findAll({
      include: [
        {
          model: User, // Assuming you have a User model associated with Team
          as: "users", // Alias for the association
        },
      ],
    });
    res.send(teams);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching teams");
  }
};

module.exports = {
  addTeam,
  editTeam,
  deleteTeam,
  getTeamById,
  getAllTeams,
};
