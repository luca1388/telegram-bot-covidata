const express = require("express");
const router = express.Router();

const telegramController = require("../controllers/telegramController");

router.post('/', telegramController.handleNewMessage);

module.exports = router;