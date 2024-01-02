const express = require("express");
const router = express.Router();
const {
  userLogin,
  registerUser,
} = require("../../controllers/auth/authController");

router.post("/login", userLogin);

module.exports = router;
