//winston used for logging
var winston = require("winston");
require("winston-daily-rotate-file");

var fs = require("fs");
var dir = "./logs";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
var transport = new winston.transports.DailyRotateFile({
  filename: "./logs/log",
  datePattern: "yyyy-MM-dd.",
  prepend: true,
  level: process.env.ENV === "prod" ? "debug" : "info",
});

var logger = winston.createLogger({
  transports: [transport],
});

exports.logger = logger;
exports.transport = transport;
