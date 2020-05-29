var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Importing nconf Configs and logger
var config = require("./utils/configuration");
var appLogger = require("./utils/appLogger");
const routes = require("./routes");

// providing logging options to logger
var logOption = config.get("log:logOption");

//DB config
const dbConnection =
  config.get("databaseSettings:dialect") +
  config.get("databaseSettings:username") +
  ":" +
  config.get("databaseSettings:password") +
  "@" +
  config.get("databaseSettings:host") +
  ":" +
  config.get("databaseSettings:port") +
  "/" +
  config.get("databaseSettings:database");

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || dbConnection, {
    useNewUrlParser: true,
  })
  .then(() => {
    appLogger.logger[logOption.toString()]("MongoDB connected successfully");
    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      appLogger.logger[logOption.toString()]("App listening on port : " + port);
      console.log("App now running on port", port);
    });
  })
  .catch((err) => {
    appLogger.logger[logOption.toString()]("Error connecting MongoDB: " + err);
  });

// creating express app
var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

/*  "/api/sendmail"
 *    POST: sends an email to the nominated person
 */
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

//  Connect all our routes to our application
app.use("/api", routes);
