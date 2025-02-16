const mongoose = require("mongoose");

const ExtractionSchema = new mongoose.Schema({
  documentId: mongoose.Schema.Types.ObjectId,
  extractionName: String,
  pageNumber: Number,
});

module.exports = mongoose.model("Extraction", ExtractionSchema);
