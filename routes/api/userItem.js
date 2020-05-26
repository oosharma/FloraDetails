const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Item Model

const User = require("../../models/user");

router.post("/", auth, (req, res) => {
  const { filter, update } = req.body;

  // Check for existing user
  User.findOneAndUpdate(filter, update).then(user => {
    // if (user) return res.status(400).json({ msg: "User already exists" });
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        items: user.items
      }
    });
    // Create slat & hash
  });
});

module.exports = router;
