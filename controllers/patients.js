const Team = require("../models/team");
const Patient = require("../models/patient");

const addPatient = async (req, res) => {
  try {
    const teamId = req.headers.teamid ?? null;

    if (teamId == null)
      throw new Error("Patient must be associated with a team");

    const team = await Team.findByPk(teamId);
    if (!team) throw new Error("Team not found");

    const { nhs_number, name, EngagementCount, PendingCount, DOB, priority } =
      req.body;
    const patient = await Patient.create({
      DOB,
      name,
      priority,
      nhs_number,
      PendingCount,
      EngagementCount,
    });
    await patient.setTeam(team);
    res.status(200).send(patient);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const editPatient = (req, res) => {
  const {
    DOB: newDOB,
    name: newName,
    priority: newpriority,
    nhs_number: newnhs_number,
    PendingCount: newPendingCount,
    EngagementCount: newEngagementCount,
  } = req.body;
  Patient.findByPk(req.params.id)
    .then((Patient) => {
      Patient.DOB = newDOB;
      Patient.name = newName;
      Patient.priority = newpriority;
      Patient.nhs_number = newnhs_number;
      Patient.PendingCount = newPendingCount;
      Patient.EngagementCount = newEngagementCount;
      return Patient.save();
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
};
const deletePatient = (req, res) => {
  Patient.findByPk(req.params.id)
    .then((Patient) => {
      return Patient.destroy();
    })
    .then((result) => res.sendStatus(200))
    .catch((err) => res.sendStatus(428).send(err.ValidationErrorItem.message));
};
const getPatientById = (req, res) => {
  Patient.findByPk(req.params.id)
    .then((Patient) => {
      res.send(Patient);
    })
    .catch((err) => console.log(err));
};
const getAllPatients = (req, res) => {
  Patient.findAll()
    .then((Patients) => {
      res.send(Patients);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  addPatient,
  editPatient,
  deletePatient,
  getPatientById,
  getAllPatients,
};
