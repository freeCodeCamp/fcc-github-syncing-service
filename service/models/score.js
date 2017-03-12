const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  username: String,
  score:
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
