const Team = require("../models/team");
const User = require("../models/user");
const Ward = require("../models/ward");

const addWard = async (req, res) => {
  const { name, description, teamId = null } = req.body;
  try {
    const ward = await Ward.create({
      name,
      description,
    });

    if (teamId) {
      const team = await Team.findAll({
        where: {
          id: teamId,
        },
      });
      await Promise.all(
        team.map(async (team) => {
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

const getAllWards = async (req, res) => {
  try {
    const wards = await Ward.findAll({
      include: [
        // {
        //   model: User, // Assuming you have a User model associated with Team
        //   as: "users", // Alias for the association
        // },
        {
          model: Team, // Assuming you have a User model associated with Team
          as: "team", // Alias for the association
        },
      ],
    });
    res.send(wards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching teams");
  }
};

module.exports = {
  addWard,
  getAllWards,
  //   editTeam,
  //   deleteTeam,
  //   getTeamById,
  //   getAllTeams,
};
