const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Get a JWT token
 *     description: Generates a JWT token for authentication.
 *     responses:
 *       200:
 *         description: A JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/login", login);

module.exports = router;
