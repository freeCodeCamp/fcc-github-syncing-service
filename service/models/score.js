const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  username: { type: String, index: true, required: true },
  score: { type: Number, default: 0, min: 0, max: 100 },
  hasFinished: { type: Boolean, default: false },
}, {
  timestamps: true,
});

scoreSchema.static('findOneOrCreate', function (name, callback) {
  this.findOne(name, (err, model) => {
    if (model) {
      return callback(err, model);
    }

    return this.create(name, (err, model) => {
      callback(err, model);
    });
  });
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
