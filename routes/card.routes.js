const router = require("express").Router();
const controller = require("../controllers/card.controller");

// Get all cards for a deck
router.get("/:deckId", controller.getCardsByDeck);

// Create a new card in a deck
router.post("/:deckId", controller.createCard);

// DELETE /api/cards/:id
router.delete("/:id", controller.deleteCard);

module.exports = router;
