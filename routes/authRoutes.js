// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/auth/authController");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.get("/login-failure", authController.loginFailure);
router.get("/login-success", authController.loginSuccess);
router.get("/logout", authController.logout);
router.get("/users", authController.getAllUsers);
router.post("/user", authController.getUserDetails);

module.exports = router;
