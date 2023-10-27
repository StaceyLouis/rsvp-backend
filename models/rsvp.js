const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  name: String,
  email: String,
  attending: Boolean,
});

module.exports = mongoose.model("Rsvp", rsvpSchema);
