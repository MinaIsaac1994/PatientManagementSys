const express = require("express");
const router = express.Router();

const {
  addVisit,
  editVisit,
  deleteVisit,
  fetchAllVisits,
  fetchUserVisits,
  fetchTeamVisits,
  fetchWardVisits,
  fetchPatientVisits,
} = require("../controllers/visits");

// router.put("/:id", editUser);
// router.get("/:id", getUserById);
// router.delete("/:id", deleteUser);
router.get("/", fetchAllVisits);
router.post("/", addVisit);

module.exports = router;
