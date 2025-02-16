const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: String,
  path: String,
  dateUploaded: { type: Date, default: Date.now },
  userId: String, 
});

module.exports = mongoose.model("Document", DocumentSchema);
