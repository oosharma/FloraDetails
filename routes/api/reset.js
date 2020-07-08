require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

const nodeMailer = require("nodemailer");

// @route GET api/auth
// @desc Authenticate user
// @access public
router.post("/", (req, res) => {
  const { email } = req.body;

  // Simple validation
  if (!email) {
    return res.status(400).json({ msg: "Please enter email" });
  }

  // Check for existing user11111
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        const transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
          }
        });

        // let base = "";
        // if (process.env === "production") {
        //   resetUrl = `http://floradetails.com/?token-${token} `;
        // } else {
        //   resetUrl = `http://localhost:3000/?token-${token} `;
        // }

        const mailOptions = {
          from: "floradetailsweb@gmail.com",
          to: `${user.email}`,
          subject: "Flora Details: Link To Reset Password",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `http://floradetails.com/?token-${token} ` +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            res.status(400).json({ msg: "Email not sent" });
            //console.error("there was an error: ", err);
          } else {
            res.status(200).json("recovery email sent");
          }
        });
      }
    );
  });
});

// @route GET api/auth/user
// @desc Authenticat user
// @access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});
module.exports = router;
