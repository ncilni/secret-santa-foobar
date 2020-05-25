var path = require("path");
var config = require("nconf");

function configure() {
  var configFileLocation = path.resolve(__dirname);
  config.argv().env();
  var environment = process.env.APPLICATION_ENV || "development"; // eslint-disable-line
  console.log("***Environment*** : ", environment);
  configFileLocation = path.join(
    configFileLocation,
    "../configs/",
    environment.toLowerCase()
  );
  configFileLocation += ".json";
  config.file(configFileLocation);
}

configure.prototype.get = function(key) {
  return config.get(key);
};

module.exports = new configure();
