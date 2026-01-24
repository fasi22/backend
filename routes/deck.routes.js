// const router = require("express").Router();
// const controller = require("../controllers/deck.controller");

// router.get("/", controller.getAllDecks);
// router.post("/", controller.createDeck);

// module.exports = router;
const router = require("express").Router();
const controller = require("../controllers/deck.controller");

router.get("/", controller.getAllDecks);
router.post("/", controller.createDeck);

// DELETE /api/decks/:id
router.delete("/:id", controller.deleteDeck);

module.exports = router;
