const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

// Configure the local strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log(email, password, done);
      try {
        // Find the user by email in the database
        const user = await User.findOne({ email }, null, { maxTimeMS: 30000 });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Middleware to check for a valid authentication token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized: Missing token");
  }

  jwt.verify(
    token,
    "c91199eb94a1611ad93b4b1954f5efc61b0bfecdeca9955a63ee3ffb69824d22e091c5606a6b600e05a7491cb5af6993197a01541af1222a49fa14d91bb26039c674031a48d61415db7b960d4ceacddb89f13b121b584269a3e4313b0189019afae841fa0873cad866edb23b201e32ddfedaa0f821336d01b5a0a11201ee93ce",
    (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden: Invalid token");
      }

      req.user = user;
      next();
    }
  );
};

// Generate a JWT token
const generateToken = (user) => {
  const expiresIn = 60 * 60 * 72; // 24 hours in seconds
  return jwt.sign(
    { id: user.id, email: user.email },
    "c91199eb94a1611ad93b4b1954f5efc61b0bfecdeca9955a63ee3ffb69824d22e091c5606a6b600e05a7491cb5af6993197a01541af1222a49fa14d91bb26039c674031a48d61415db7b960d4ceacddb89f13b121b584269a3e4313b0189019afae841fa0873cad866edb23b201e32ddfedaa0f821336d01b5a0a11201ee93ce",
    {
      expiresIn,
    }
  );
};

exports.registerUser = async (req, res) => {
  try {
    // Use the authenticateToken middleware to check for a valid token
    // authenticateToken(req, res, async () => {
    const { fullName, email, password, phoneNumber, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    await newUser.save();
    res.status(201).send("User created successfully.");
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user, "user");
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }

    if (!user) {
      return res.status(401).send("Login failed. Incorrect email or password.");
    }

    // Generate a JWT token
    const token = generateToken(user);

    // Include the token and user's email in the response
    return res.status(200).json({
      token,
      email: user.email,
      role: user.role,
      message: "Login successful.",
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    res.status(200).send("Logout successful.");
  });
};

exports.loginFailure = (req, res) => {
  res.status(401).send("Login failed.");
};

exports.loginSuccess = (req, res) => {
  res.status(200).send("Login successful.");
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Fetch details of the authenticated user
exports.getUserDetails = async (req, res) => {
  try {
    // const authToken = req.headers.authorization;

    // if (!authToken) {
    //   return res.status(401).send("Unauthorized: Missing token");
    // }

    // try {
    //   // Verify the token with the correct secret key
    //   const decodedToken = jwt.verify(
    //     authToken,
    //     "c91199eb94a1611ad93b4b1954f5efc61b0bfecdeca9955a63ee3ffb69824d22e091c5606a6b600e05a7491cb5af6993197a01541af1222a49fa14d91bb26039c674031a48d61415db7b960d4ceacddb89f13b121b584269a3e4313b0189019afae841fa0873cad866edb23b201e32ddfedaa0f821336d01b5a0a11201ee93ce"
    //   );

    // console.log("Decoded Token:", decodedToken);

    // const userId = decodedToken.id; // Assuming your user model has an 'id' field

    // Fetch user details based on the user ID
    const user = await User.findOne({ email: req.body.email }, "-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
    // } catch (error) {
    //   console.error("Error decoding token:", error);
    //   return res.status(403).send("Forbidden: Invalid token");
    // }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
