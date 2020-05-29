const router = require("express").Router();
const nodemailer = require("nodemailer");
var appLogger = require("../../utils/appLogger");
var errorHandler = require("../../utils/errorHandler");

// importing validation model
const createActivitySchema = require("../../validations/createActivity");

// Importing email templates
const emailTemplates = require("../../utils/email-sender/emailTemplates");

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

// @route POST activity/organize
// @desc Organize a Secret Santa activity, Send email invites to all invited people
// @access Private
router.post("/", (req, res) => {
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

module.exports = router;
