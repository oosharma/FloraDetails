// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ItemSchema = new Schema(
  {
    commonName: String,
    bloomTime: String,
    plantType: String,
    appropriateLocation: String,

    waterNeeds: String,
    sizeAtMaturity: String,
    suitableSiteConditions: String
  },

  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = Item = mongoose.model("item", ItemSchema);
