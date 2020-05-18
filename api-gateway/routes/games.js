const router = require('express').Router();
const { gamesController } = require('../controllers/index');

// Retrieve summary of the games
router.get('/games/report', gamesController.getReport);

// Retrieve single game info by game_id
router.get('/games/:gameId', gamesController.getGame);

module.exports = router;
