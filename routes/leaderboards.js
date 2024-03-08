const express = require('express');
const router = express.Router();
const leaderboardsCtrl = require('../controllers/leaderboards');


router.post('/', leaderboardsCtrl.createScore);

router.get('/:game/', leaderboardsCtrl.getAllScores);

router.post('/delete-all', leaderboardsCtrl.deleteAllScores);

module.exports = router;