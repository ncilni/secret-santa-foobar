var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Importing nconf Configs and logger
var config = require("./utils/configuration");
var appLogger = require("./utils/appLogger");

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

app.post("/api/sendmail", function (req, res) {
  //   let mailSendingOptions = req.body;
  mailSendingOptions = {
    inviter: {
      name: "Neeraj Chauhan",
      email: "ncilni@gmail.com",
    },
    invitationMessage:
      "You are invited to take part in the game of Secret Santa. Let's spread the cheer around this Holiday Season! You are Secret Santa for:",
    invitees: [
      {
        name: "Karuna Sethi",
        email: "ncilni@gmail.com",
        assigned: {
          name: "Shireen Sethi",
          email: "shireensethi10@gmail.com",
        },
      },
      {
        name: "Shireen Sethi",
        email: "shireensethi10@gmail.com",
        assigned: {
          name: "Anu Sethi",
          email: "luckysaggi66@gmail.com",
        },
      },
      {
        name: "Anu Sethi",
        email: "luckysaggi66@gmail.com",
        assigned: {
          name: "Karuna Sethi",
          email: "sethikaruna5@gmail.com",
        },
      },
    ],
  };
  let erroredInvitees = [];
  mailSendingOptions.invitees.forEach((invitee) => {
    let mailTemplate = emailTemplates.template.replace(
      /inviteeName/g,
      `Hi ${invitee.name}! You have been nominated by ${mailSendingOptions.inviter.name}`
    );
    mailTemplate = mailTemplate.replace(
      /invitationMessage/g,
      mailSendingOptions.invitationMessage
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
        console.log("error occurred", err);
        erroredInvitees.push(invitee);
      } else {
        console.log("Email sent!");
      }
    });
  });
  if (erroredInvitees.length > 0) {
    res.json({
      status: "error",
      success: false,
      errorFields: erroredInvitees,
    });
  } else {
    res.json({
      status: "sent",
      success: true,
      errorFields: erroredInvitees,
    });
  }
});

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      errorHandler.handle(500, "Database Error", err, req, res);
    } else {
      if (contacts) {
        res.status(200).json(contacts);
      } else {
        handleError(res, err.message, "Failed to get contacts.");
      }
    }
  });
});
