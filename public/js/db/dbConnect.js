const mongoose = require("mongoose");
const UpdateCount = require("../models/count");

// import "dotenv/config";
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then(async () => {
      console.log("Connected to your sordid little grief hole Database");
      // const thing = await UpdateCount.findOne({ name: "count" });
      // thing.count = thing.count + 1;
      // thing.save();
      // console.log("hi", thing);
    })
    .catch((err) => {
      console.log("Unable to connect to grief hole");
      console.error(err);
      process.exit(1);
    });
};
module.exports = dbConnect;
