const express = require("express");
const axios = require("axios");
const router = express.Router();

// Initialize payment
router.post("/initialize", async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post("https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 }, // Paystack expects kobo/pesewas
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Paystack webhook
router.post("/webhook", express.json({ type: "application/json" }), (req, res) => {
  const event = req.body;
  console.log("💳 Webhook received:", event);

  if (event.event === "charge.success") {
    // TODO: Save payment record to DB, send email, etc.
  }

  res.sendStatus(200);
});

module.exports = router;

