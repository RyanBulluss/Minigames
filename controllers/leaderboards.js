const Score = require("../models/score")

module.exports = {
    getAllScores,
    createScore,
    deleteAllScores,
};

async function getAllScores(req, res) {
    const leaderboard = await Score.find({ game: req.params.game }).populate('user');
    res.json( leaderboard )
}

async function deleteAllScores(req, res) {
    const allLeaderboards = await Score.deleteMany({});
    res.json( allLeaderboards )
}

async function createScore(req, res) {
    const newScore = await Score.create(req.body);
    res.json( newScore )
}