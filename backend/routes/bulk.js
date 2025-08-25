const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const totalOrders = sheet.length;
    const totalAmount = sheet.reduce((sum, row) => sum + Number(row.price || 0), 0);

    res.json({
      message: "File processed successfully",
      totalOrders,
      totalAmount,
      email: req.body.email || "customer@example.com"
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file: " + err.message });
  }
});

module.exports = router;

