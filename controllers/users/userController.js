const User = require("../../models/plotsUsers");

// Controller function to fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    let filters = {};
    if (req.query.userName) {
      filters.userName = req.query.userName;
    }
    if (req.query.userRole) {
      filters.userRole = req.query.userRole;
    }
    if (req.query.userEmail) {
      filters.userEmail = req.query.userEmail;
    }
    if (req.query.userPhoneNumber) {
      filters.userPhoneNumber = req.query.userPhoneNumber;
    }

    const users = await User.find(filters);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a specific user by ID
exports.getUserById = async (req, res) => {
  // Implementation for fetching a user by ID
  res.json(res.user);
};
