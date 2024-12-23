const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/functionUser");

// User routes
router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);

module.exports = router;
