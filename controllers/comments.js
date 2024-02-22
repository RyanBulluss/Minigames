const Comment = require("../models/comment")

module.exports = {
    createComment,
    getAllComments,
    deleteComment
};

async function createComment(req, res) {
  console.log(req.body)
    try {
        const comment = await Comment.create(req.body);
        res.json( comment );
      } catch {
        res.status(400).json('Failed to create comment');
      }
}

async function getAllComments(req, res) {
    try {
        const comments = await Comment.find({game: req.params.game}).populate("user");
        res.json( comments );
      } catch {
        res.status(400).json('Failed to find comments');
      }
}

async function deleteComment(req, res) {
    try {
        const comments = await Comment.deleteOne({_id: req.body._id});
        res.json( comments );
      } catch {
        res.status(400).json('Failed to delete comment');
      }
}


