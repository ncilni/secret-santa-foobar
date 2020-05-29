const activity = require("express").Router();
const organize = require("./organize");

activity.use("/organize", organize);

module.exports = activity;
