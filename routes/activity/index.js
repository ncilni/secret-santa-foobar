const users = require("express").Router();
const organize = require("./organize");

users.use("/organize", organize);

module.exports = activity;
