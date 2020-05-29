const routes = require("express").Router();

const activity = require("./activity");

routes.use("/activity", activity);

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Connected!",
  });
});

module.exports = routes;
