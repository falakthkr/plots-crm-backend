// server.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const plotRoutes = require("./routes/plotRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const dotenv = require("dotenv");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    secret: crypto.randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/plots", plotRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.post("/", (req, res) => {
  res.json({
    message: "APIs are working",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
