const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { uploadDocument, getDashboard, getDocument } = require("../controllers/documentController");

const router = express.Router();

/**
 * @swagger
 * /documents/dashboard:
 *   get:
 *     summary: Get document dashboard
 *     security:
 *       - BearerAuth: []
 *     description: Returns a list of document names and their upload dates.
 *     responses:
 *       200:
 *         description: A list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   dateUploaded:
 *                     type: string
 *                     format: date-time
 */
router.get("/dashboard", authMiddleware, getDashboard);

/**
 * @swagger
 * /documents/upload:
 *   post:
 *     summary: Upload a PDF document
 *     security:
 *       - BearerAuth: []
 *     description: Uploads a PDF file and stores metadata.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: PDF uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 docId:
 *                   type: string
 */
router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Retrieve document metadata and extractions
 *     security:
 *       - BearerAuth: []
 *     description: Returns metadata and extraction data for a document.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The document ID
 *     responses:
 *       200:
 *         description: Document details and extractions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     path:
 *                       type: string
 *                     dateUploaded:
 *                       type: string
 *                       format: date-time
 *                 extractions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       extractionName:
 *                         type: string
 *                       pageNumber:
 *                         type: integer
 */
router.get("/:id", authMiddleware, getDocument);

module.exports = router;
