const Team = require("../models/team");
const Patient = require("../models/patient");
const Ward = require("../models/ward");

const addPatient = async (req, res) => {
  try {
    let ward;
    const wardId = typeof req.body.wardId == "number" ? req.body.wardId : null;

    if (wardId !== null) {
      ward = await Ward.findByPk(wardId);

      if (!ward) {
        throw new Error("Ward not found");
      }
    }

    const updatableFields = Object.keys(Patient.rawAttributes);
    let newPatient = {};
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        newPatient[field] = req.body[field];
      }
    });

    const patient = await Patient.create(newPatient);

    if (ward) {
      await patient.setWard(ward);

      const teamId = ward.teamId;
      if (teamId) {
        const team = await Team.findByPk(teamId);
        if (team) await patient.setTeam(team);
      }
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
    res.status(500).send(error);
  }
};

module.exports = {
  addPatient,
  editPatient,
  deletePatient,
  getPatientById,
  getAllPatients,
};
