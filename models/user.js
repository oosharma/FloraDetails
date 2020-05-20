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
  items: {
    commonName: String,
    bloomTime: String,
    plantType: String,
    appropriateLocation: String,
    waterNeeds: String,
    sizeAtMaturity: String,
    suitableSiteConditions: String
  }
});

// export the new Schema so we could modify it using Node.js
module.exports = User = mongoose.model("user", UserSchema);
