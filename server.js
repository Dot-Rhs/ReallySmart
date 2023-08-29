const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const dbConnect = require("./public/js/db/dbConnect");
const UpdateCount = require("./public/js/models/count");

app.engine("html", require("ejs").renderFile);
app.listen(5200, () => console.log("Connected to sordid little grief hole."));

app.get("/", async (req, res) => {
  if (res.statusCode === 200) {
    dbConnect();

    const updateCount = await UpdateCount.findOne({ name: "count" });
    updateCount.count = updateCount.count + 1;
    updateCount.save();

    const count = updateCount.count;

    app.use(express.static("public"));
    res.render(path.join(__dirname + "/public/index.html"), { count: count });
  }
});
