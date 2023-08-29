const mongoose = require("mongoose");

const updatecountSchema = new mongoose.Schema(
  {
    name: String,
    count: Number,
  },
  {
    collection: "Bimothy",
  },
);

const UpdateCount = mongoose.model("UpdateCount", updatecountSchema);

module.exports = UpdateCount;
