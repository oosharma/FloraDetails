// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  profile_pic: {
    type: Boolean,
    default: false
  },
  pic_uri: {
    type: String,
    default: null
  },
  items: {
    type: Array,
    default: []
  }
});

// export the new Schema so we could modify it using Node.js
module.exports = User = mongoose.model("user", UserSchema);
