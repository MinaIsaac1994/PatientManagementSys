const User = require("../models/user");
const Ward = require("../models/ward");
const Teams = require("../models/team");
const Visit = require("../models/visit");
const { Sequelize } = require("sequelize");
const Patient = require("../models/patient");

const addVisit = async (req, res) => {
  try {
    const { userId, patientId, visitData } = req.body;

    // Ensure the user and patient exist
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Teams,
          attributes: ["name"],
        },
      ],
    });
    const patient = await Patient.findByPk(patientId, {
      include: [
        {
          model: Ward,
          attributes: ["name"],
        },
      ],
    });

    if (!user || !patient) {
      return res.status(404).json({ message: "User or Patient not found" });
    }

    // Create the visit
    const newVisit = await Visit.create({
      ward: patient.ward.name,
      team: user.team.name,
      userId: user.id,
      patientId: patient.id,
    });

    // Send response
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editVisit = async () => {
  try {
  } catch (error) {}
};

const deleteVisit = async () => {
  try {
  } catch (error) {}
};

const fetchPatientVisits = async () => {
  try {
  } catch (error) {}
};
const fetchUserVisits = async () => {
  try {
  } catch (error) {}
};
const fetchWardVisits = async () => {
  try {
  } catch (error) {}
};

const fetchTeamVisits = async () => {
  try {
  } catch (error) {}
};

const fetchAllVisits = async (req, res) => {
  try {
    const visits = Visit.findAll({
      attributes: {
        include: [
          {
            model: "user",
          },
          {
            model: "patients",
          },
        ],
      },
    });
    res.send(visits);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addVisit,
  editVisit,
  deleteVisit,
  fetchAllVisits,
  fetchUserVisits,
  fetchTeamVisits,
  fetchWardVisits,
  fetchPatientVisits,
};
