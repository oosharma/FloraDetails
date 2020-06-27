const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
var path2 = require("path");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");

// Item Model

const User = require("../../models/user");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  console.log(type);
  console.log(type);
  console.log(type.mime);
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_BUCKET_NAME,
    ContentType: `image/${type.substring(1)}`,
    Key: `${name}.${type.substring(1)}`
  };
  return s3.upload(params).promise();
};

// @route GET api/users
// @desc Register new user
// @access public
router.post("/", auth, (req, res) => {
  const token = req.header("x-auth-token");
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  const filter = { id: decoded.id };
  console.log(token);
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = path2.extname(path);
      console.log("ggagagaga");
      console.log(type);
      console.log(decoded.id.toString());
      //const fileName = `-dp`;
      const fileName = `${decoded.id.toString()}-dp`;
      const update = { profile_pic: true, pic_uri: `${fileName}${type}` };
      const validFileExtensions = [
        ".jpg",
        ".JPG",
        ".jpeg",
        ".bmp",
        ".gif",
        ".png"
      ];
      if (!validFileExtensions.includes(type)) {
        console.log("got here");
        return res.status(400).send("Ivalid file");
      }
      console.log("got ddddd");

      const data = await uploadFile(buffer, fileName, type).then(
        User.findByIdAndUpdate(decoded.id, update)
          .then(user => {})
          .catch(err => {
            console.log("profile-pic not updated");
          })
      );
      return res.status(200).send(data);
    } catch (error) {
      res.message = "Current password does not match";

      return res.status(400).send();
    }
  });
});

module.exports = router;
