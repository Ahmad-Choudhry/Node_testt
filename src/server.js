require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const documentRoutes = require("./routes/documentRoute");
const setupSwagger = require("./swagger");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/documents", documentRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
