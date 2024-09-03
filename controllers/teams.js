const Teams = require("../models/team");
const User = require("../models/user");
const Ward = require("../models/ward");
const { Sequelize } = require("sequelize");
const Patient = require("../models/patient");

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

const getTeamById = async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        {
          model: Patient,
          as: "patients",
          // attributes: ["priority"],
          include: {
            model: Ward,
            attributes: {
              exclude: ["updatedAt", "createdAt"],
            },
          },
        },
      ],
    });
    res.send(team);
  } catch (error) {
    res.status(500).send("Error fetching teams");
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Teams.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        {
          model: Patient,
          as: "patients",
          attributes: ["priority"],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM `patients` AS `patients` WHERE `patients`.`teamId` = `team`.`id`)"
            ),
            "totalPatients",
          ],
        ],
        exclude: ["updatedAt", "createdAt"],
      },
    });

    const formattedTeams = teams.map((team) => {
      const priorityCounts = team.patients.reduce((acc, { priority }) => {
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
      }, {});

      const priorities = Object.entries(priorityCounts).map(
        ([priority, count]) => ({
          [priority]: count,
        })
      );

      // Replace the patients array with the grouped priorities
      return {
        ...team.toJSON(),
        priorities,
        patients: undefined,
      };
    });

    res.send(formattedTeams);
  } catch (err) {
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



// date time 
// therapists
// speciality 
//ward
//team
// outcomes: dc, fu, refused
// audit tab

//add pathways in patients details