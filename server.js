var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Importing nconf Configs and logger
var config = require("./utils/configuration");
var appLogger = require("./utils/appLogger");
var errorHandler = require("./utils/errorHandler");
const routes = require("./routes");

// Importing email templates
const emailTemplates = require("./utils/email-sender/emailTemplates");

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

// Load Contact model
const Contact = require("./models/Contact");

// importing validation model
const createActivitySchema = require("./validations/createActivity");

// creating express app
var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Creating the Gmail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  requireTLS: true,
  auth: {
    user: "secret.santa.foobar@gmail.com",
    pass: "Karuna@1912",
  },
});

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

app.post("/api/activity/organize", function (req, res) {
  let secretSantaActivity = req.body;
  const validation = createActivitySchema.validate(secretSantaActivity);
  if (validation.error) {
    errorHandler.handle(400, validation.error, null, req, res);
  } else {
    let erroredInvitees = [];
    secretSantaActivity.invitees.forEach((invitee, index) => {
      let mailTemplate = emailTemplates.template.replace(
        /inviteeName/g,
        `Hi ${invitee.name}! You have been nominated by ${secretSantaActivity.inviter.name}`
      );
      mailTemplate = mailTemplate.replace(
        /invitationMessage/g,
        secretSantaActivity.invitationMessage
      );
      mailTemplate = mailTemplate.replace(/assignee/g, invitee.assigned.name);
      let mailOptions = {
        from: "secret.santa.foobar@gmail.com",
        to: invitee.email,
        subject: `HO HO HO! ${invitee.name}!!`,
        html: mailTemplate,
        attachments: emailTemplates.assets,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          erroredInvitees.push(invitee);
        }
        if (index === secretSantaActivity.invitees.length - 1) {
          if (erroredInvitees.length > 0) {
            appLogger.logger[logOption.toString()](
              `Email sending error || Invited by: ${secretSantaActivity.inviter.name}<${secretSantaActivity.inviter.email}> || errored invitees: ${erroredInvitees}`
            );
            res.json({
              status: "error",
              success: false,
              errorInvites: erroredInvitees,
            });
          } else {
            appLogger.logger[logOption.toString()](
              `Email sent successfully || Invited by: ${secretSantaActivity.inviter.name}<${secretSantaActivity.inviter.email}>`
            );
            res.json({
              status: "sent",
              success: true,
            });
          }
        }
      });
    });
  }
});
