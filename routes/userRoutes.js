const express = require("express");
const router = express.Router();
const userController = require("../controllers/users/userController");

// Route to fetch all users
router.get("/users", userController.getAllUsers);

// Route to fetch a specific user by ID
router.get("/users/:id", userController.getUserById);

// Route to update a user by ID
router.patch("/users/:id", userController.updateUserById);

module.exports = router;
