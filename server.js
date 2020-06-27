const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const path = require("path");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.get("/reset", (req, res) => {
  res.json({ item: "reset" });
});
app.use(cors());
const router = express.Router();
// DB Config
const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const {
    commonName,
    bloomTime,
    plantType,
    appropriateLocation,
    waterNeeds,
    sizeAtMaturity,
    suitableSiteConditions
  } = req.body;

  if ((!id && id !== 0) || !commonName) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.commonName = commonName;
  data.id = id;
  data.bloomTime = bloomTime;
  data.plantType = plantType;
  data.appropriateLocation = appropriateLocation;
  data.waterNeeds = waterNeeds;
  data.sizeAtMaturity = sizeAtMaturity;
  data.suitableSiteConditions = suitableSiteConditions;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

//defining routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/userItem", require("./routes/api/userItem"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/reset", require("./routes/api/reset"));
app.use("/api/passReset", require("./routes/api/passReset"));
app.use("/api/upload", require("./routes/api/upload"));

const API_PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/reset", (req, res) => {
    res.JSON("here");
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
