const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    front: String,
    back: String,
    hint: String,

    interval: { type: Number, default: 1 },
    repetition: { type: Number, default: 0 },
    easeFactor: { type: Number, default: 2.5 },
    nextReview: Date,

    deckId: { type: mongoose.Schema.Types.ObjectId, ref: "Deck" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
