const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// Item Model

const User = require("../../models/User");

// @route GET api/users
// @desc Register new user
// @access public
router.post("/", (req, res) => {
  const { filter, update } = req.body;
  //   //const update = req.body.items;

  //   console.log({ filter });
  //   console.log({ update });

  // Simple validation
  //   if (!name || !email || !password) {
  //     return res.status(400).json({ msg: "lease enter all fields" });
  //   }

  // Check for existing user
  User.findOneAndUpdate(filter, update).then(user => {
    // if (user) return res.status(400).json({ msg: "User already exists" });
    res.json(user);
    // Create slat & hash
  });
});

module.exports = router;
