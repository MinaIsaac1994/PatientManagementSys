const express = require("express");
const router = express.Router();

const {
  addTeam,
  editTeam,
  deleteTeam,
  getTeamById,
  getAllTeams,
} = require("../controllers/teams");

router.put("/:id", editTeam);
router.get("/:id", getTeamById);
router.delete("/:id", deleteTeam);
router.get("/", getAllTeams);
router.post("/", addTeam);

module.exports = router;
