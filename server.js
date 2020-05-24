var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const nodemailer = require("nodemailer");

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

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

let mailOptions = {
  from: "secret.santa.foobar@gmail.com",
  to: "ncilni@gmail.com",
  subject: "Testing",
  text: "hi! this is a test email",
};

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function (req, res) {
  db.collection(CONTACTS_COLLECTION)
    .find({})
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/contacts", function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (
      err,
      doc
    ) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log("error occurred", err);
          } else {
            console.log("Email sent!");
          }
        });
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).findOne(
    { _id: new ObjectID(req.params.id) },
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get contact");
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

app.put("/api/contacts/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update contact");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});

app.delete("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});
