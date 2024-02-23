const Score = require("../models/score")

module.exports = {
    getAllScores,
    createScore,
};

async function getAllScores(req, res) {
    const leaderboard = await Score.find({ game: req.params.game });
    res.json( leaderboard )
}

async function createScore(req, res) {
    const newScore = await Score.create(req.body);
    res.json( newScore )
}