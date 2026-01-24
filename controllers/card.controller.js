const Card = require("../models/Card");

exports.getCardsByDeck = async (req, res) => {
  const cards = await Card.find({ deckId: req.params.deckId });
  res.json(cards);
};

exports.createCard = async (req, res) => {
  const card = await Card.create({
    ...req.body,
    deckId: req.params.deckId
  });
  res.status(201).json(card);
};
// Delete a card by ID
exports.deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) return res.status(404).json({ message: "Card not found" });

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err); // <-- check server logs
    res.status(500).json({ message: "Server error" });
  }
};
