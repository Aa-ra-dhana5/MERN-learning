const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // ✅ UUID module
const supabase = require("../supabaseServer");
const router = express.Router();
const fileModel = require("../models/files.models");
const authMiddleware = require("../middlewares/authe");
const upload = multer({ storage: multer.memoryStorage() });

// If you don't already have UUID installed
// npm install uuid

router.post(
  "/upload-file",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).send("No file uploaded");

      const userId = req.body.userId; // Optional: Pass userId in formData
      const uniqueId = uuidv4(); // 🔐 Unique identifier
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${userId}_${uniqueId}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from("user-files") // Bucket name
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false, // 🚫 Prevent overwriting existing files
        });

      if (error) {
        console.error(error);
        return res.status(500).send("Upload failed");
      }

      const fileDoc = new fileModel({
        path: fileName,
        originalname: file.originalname,
        user: userId,
      });

      await fileDoc.save();
      res.status(200).send({
        message: "File uploaded and metadata saved",
        fileName,
        fileId: fileDoc._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;
