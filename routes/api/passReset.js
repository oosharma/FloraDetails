const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

// @route GET api/auth
// @desc Authenticate user
// @access public
router.post("/", (req, res) => {
  const { password } = req.body;
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  let decoded;
  try {
    let tempTok =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2RhNWEwODQ5YjlhMmIyNDJjNDRkYyIsImlhdCI6MTU5MDU1NzA2MywiZXhwIjoxNTkwNTYwNjYzfQ.2mk8pbIZWr1qxOUVs2r5Pd5zxHhz01b0bfILMz7sVqU";

    // Verify token
    decoded = jwt.verify(token, config.get("jwtSecret"));

    let hashedPass = "";
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        hashedPass = hash;
        const filter = { id: decoded.id };
        const update = { password: hashedPass };
        User.findByIdAndUpdate(decoded.id, update)
          .then(user => {
            res.status(200).json({ msg: "Password successfully set " });
          })
          .catch(err => {
            res
              .status(400)
              .json({ msg: "Reset unsuccessful, please try again " });

            JSON.stringify(err);
          });
      });
    });

    // Add user from payload

    // next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }

  // Simple validation

  // Check for existing user
});

module.exports = router;
