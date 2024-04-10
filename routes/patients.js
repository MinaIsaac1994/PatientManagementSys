const express = require("express");
const router = express.Router();

const {
  addPatient,
  editPatient,
  deletePatient,
  getPatientById,
  getAllPatients,
} = require("../controllers/patients");

router.put("/:id", editPatient);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);
router.get("/", getAllPatients);
router.post("/", addPatient);

module.exports = router;
