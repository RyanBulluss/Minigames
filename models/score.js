const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Score = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: String, required: true },
    score: { type: Number, required: true },
    time: {type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", Score);