var appLogger = require("./appLogger");
var config = require("./configuration");
var logOption = config.get("log:logOption");

module.exports = {
  handle: function (status, errorMessage, logMessage, req, res) {
    if (errorMessage) {
      if (logMessage) {
        appLogger.logger[logOption.toString()]("Error:", logMessage);
      }
      res.status(status).json({
        error: errorMessage,
      });
    } else {
      if (logMessage) {
        appLogger.logger[logOption.toString()]("Error:", logMessage);
      }
      res.sendStatus(status);
    }
  },
};
