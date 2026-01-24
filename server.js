const express = require("express");
require("dotenv").config();
require("./config/database");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // optional if you use cookies
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Flashcard API is running 🚀" });
});

// Routes (later)
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/decks", require("./routes/deck.routes"));
app.use("/api/cards", require("./routes/card.routes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
