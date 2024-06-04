const Team = require("../models/team");
const Patient = require("../models/patient");
const Ward = require("../models/ward");

const addPatient = async (req, res) => {
  try {
    const wardId = req.body.wardId ?? null;

    if (wardId == null)
      throw new Error("Patient must be associated with a ward");

    const ward = await Ward.findByPk(wardId);
    if (!ward) throw new Error("Team not found");

    const teamId = ward.teamId;

    const {
      DOB,
      name,
      area,
      active,
      details,
      address,
      priority,
      diagnosis,
      nhs_number,
      attributes,
      specificity,
    } = req.body;
    const patient = await Patient.create({
      DOB,
      name,
      area,
      active,
      details,
      address,
      priority,
      diagnosis,
      nhs_number,
      attributes,
      specificity,
    });
    await patient.setWard(ward);
    if (teamId) {
      const team = await Team.findByPk(teamId);
      if (team) await patient.setTeam(team);
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const editPatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.sendStatus(404);
    }
    const updatableFields = Object.keys(Patient.rawAttributes);
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        patient[field] = req.body[field];
      }
    });

    const updatedPatient = await patient.save();
    res.status(200).send(updatedPatient);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.sendStatus(404);
    }
    await patient.destroy();
    res.sendStatus(200);
  } catch (err) {
    if (err.ValidationErrorItem && err.ValidationErrorItem.message) {
      res.status(428).send(err.ValidationErrorItem.message);
    } else {
      res.sendStatus(500);
    }
  }
};
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.sendStatus(404);
    }
    res.send(patient);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: Team,
          as: "team",
        },
        {
          model: Ward,
          as: "ward",
        },
      ],
    });
    res.send(patients);
  } catch (error) {
    res.status(500).send("Error fetching patients");
  }
};

module.exports = {
  addPatient,
  editPatient,
  deletePatient,
  getPatientById,
  getAllPatients,
};
