const Deck = require("../models/Deck");
const Card = require("../models/Card"); // <--- needed to delete cards
const mongoose = require("mongoose");   // <--- needed to validate ObjectId

// Get all decks
exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (err) {
    console.error("GET decks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new deck
exports.createDeck = async (req, res) => {
  try {
    const deck = await Deck.create(req.body);
    res.status(201).json(deck);
  } catch (err) {
    console.error("CREATE deck error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a deck by ID
exports.deleteDeck = async (req, res) => {
  try {
    const deckId = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(deckId)) {
      return res.status(400).json({ message: "Invalid deck ID" });
    }

    // Delete all cards belonging to this deck
    await Card.deleteMany({ deckId });

    // Delete the deck itself
    const deletedDeck = await Deck.findByIdAndDelete(deckId);
    if (!deletedDeck) return res.status(404).json({ message: "Deck not found" });

    res.json({ message: "Deck deleted successfully" });
  } catch (err) {
    console.error("DELETE deck error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
