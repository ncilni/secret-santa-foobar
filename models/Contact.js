const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Create Schema
const ContactSchema = new schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    mobile: {
      type: String,
      required: false,
    },
    work: {
      type: String,
      required: false,
    },
  },
  createDate: {
    type: String,
    required: true,
  },
});

module.exports = Contact = mongoose.model("contacts", ContactSchema);
