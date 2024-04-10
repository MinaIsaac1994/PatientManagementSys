const express = require("express");
const router = express.Router();

const {
  addWard,
  getAllWards,
  //   editTeam,
  //   deleteTeam,
  //   getTeamById,
  //   getAllTeams,
} = require("../controllers/wards");

// router.put("/:id", editTeam);
// router.get("/:id", getTeamById);
// router.delete("/:id", deleteTeam);
router.get("/", getAllWards);
router.post("/", addWard);

module.exports = router;
