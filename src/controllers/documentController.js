const Document = require("../models/document");
const Extraction = require("../models/Extraction");

exports.uploadDocument = async (req, res) => {
  try {
    const doc = await Document.create({
      name: req.file.originalname,
      path: req.file.path,
      userId: req.user.id,
    });

    // Generate mock extractions
    await Extraction.create([
      { documentId: doc._id, extractionName: "Title", pageNumber: 1 },
      { documentId: doc._id, extractionName: "Abstract", pageNumber: 2 },
    ]);

    res.status(201).json({ message: "PDF uploaded", docId: doc._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  const docs = await Document.find().select("name dateUploaded");
  res.json(docs);
};

exports.getDocument = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Document not found" });

  const extractions = await Extraction.find({ documentId: doc._id });
  res.json({ document: doc, extractions });
};
