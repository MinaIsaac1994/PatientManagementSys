const express = require("express");
const router = express.Router();

const {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/users");

router.put("/:id", editUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.post("/", addUser);

module.exports = router;
