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
  console.log("reachted dfasdfdsafd");
  console.log("reachted dfasdfdsafd");

  console.log("reachted dfasdfdsafd");
  console.log("reachted dfasdfdsafd");

  // Simple validation
  if (!email) {
    return res.status(400).json({ msg: "Please enter email" });
  }

  // Check for existing user11111
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    jwt.sign(
      { id: user.id },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        console.log("token generated");
        console.log(token);

        console.log(user.email);

        const transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: `floradetailsweb@gmail.com`,
            pass: `mernapp23*`
          }
        });

        console.log("transporter generated");
        console.log(user.email);

        const mailOptions = {
          from: "floradetailsweb@gmail.com",
          to: `${user.email}`,
          subject: "Flora Details: Link To Reset Password",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `http://localhost:3000/?token-${token} ` +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };

        console.log("sending mail");

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log("not sent");
            console.log(err);

            res.status(400).json({ msg: "Email not sent" });
            //console.error("there was an error: ", err);
          } else {
            console.log("mail sent");

            console.log("here is the res: ", response);
            res.status(200).json("recovery email sent");
          }
        });
        console.log("outside");
      }
    );

    // Validate password
    // bcrypt.compare(password, user.password).then(isMatch => {
    //   if (!isMatch)
    //     return res.status(400).json({ msg: "Credentials do not match" });
    //   jwt.sign(
    //     { id: user.id },
    //     config.get("jwtSecret"),
    //     { expiresIn: 3600 },
    //     (err, token) => {
    //       if (err) throw err;
    //       res.json({
    //         token,
    //         user: {
    //           id: user.id,
    //           name: user.name,
    //           email: user.email,
    //           items: user.items
    //         }
    //       });
    //     }
    //   );
    // });
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
