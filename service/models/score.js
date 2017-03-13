const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  username: { type: String, default: 'NOT_SET' },
  score: { type: Number, default: 0, min: 0, max: 100 },
  hasFinished: { type: Boolean, default: false },
}, {
  timestamps: true,
});

scoreSchema.static('findOneOrCreate', function (query, callback) {
  this.findOne(query, (err, model) => {
    if (model) {
      return callback(err, model);
    }

    return this.create({}, (err, model) => {
      callback(err, model);
    });
  });
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
