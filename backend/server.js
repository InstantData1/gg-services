const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔹 Test route to check Firebase
app.get("/api/test", async (req, res) => {
  try {
    const testRef = db.collection("test").doc("hello");
    await testRef.set({ message: "Firebase is working 🚀" });

    const doc = await testRef.get();
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/payment", require("./routes/payment"));
app.use("/api/bulk", require("./routes/bulk"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Firebase backend running on port ${PORT}`));





