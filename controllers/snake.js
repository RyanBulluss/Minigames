const SnakeComment = require("../models/snake")

module.exports = {
    createComment,
    getAllComments,
    deleteComment
};

async function createComment(req, res) {
    try {
        const comment = await SnakeComment.create(req.body);
        res.json( comment );
      } catch {
        res.status(400).json('Failed to create comment');
      }
}

async function getAllComments(req, res) {
    try {
        const comments = await SnakeComment.find({}).populate("user");
        res.json( comments );
      } catch {
        res.status(400).json('Failed to find comments');
      }
}

async function deleteComment(req, res) {
    try {
        const comments = await SnakeComment.deleteOne({_id: req.body._id});
        res.json( comments );
      } catch {
        res.status(400).json('Failed to delete comment');
      }
}


