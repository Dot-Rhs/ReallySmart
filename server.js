const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const dbConnect = require("./public/js/db/dbConnect");
const UpdateCount = require("./public/js/models/count");

const HEADERS = {
  "Content-Security-Policy":
    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-DNS-Prefetch-Control": "off",
  "X-Download-Options": "noopen",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Permitted-Cross-Domain-Policies": "none",
  "X-XSS-Protection": "0",
};

app.engine("html", require("ejs").renderFile);
app.listen(process.env.PORT || 5000, () =>
  console.log("Connected to sordid little grief hole."),
);

app.get("/", async (req, res) => {
  if (res.statusCode === 200) {
    dbConnect();

    const updateCount = await UpdateCount.findOne({ name: "count" });
    updateCount.count = updateCount.count + 1;
    updateCount.save();

    const count = updateCount.count;

    app.use((req, res, next) => {
      res.set(HEADERS);
      next();
    });
    app.use(express.static("public"));
    res.render(path.join(__dirname + "/public/index.html"), { count: count });
  }
});
