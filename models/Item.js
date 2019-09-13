// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ItemSchema = new Schema(
  {
    message: String,
    bloom_time: String,
    plant_type: String,
    appropriate_location: String,
    water_needs: String,
    size_at_maturity: String,
    suitable_site_conditions: String
  },

  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = Item = mongoose.model("item", ItemSchema);
