const mongoose = require('mongoose');
const { MAX_SCORE } = require('../constants');

const userSchema = mongoose.Schema({
  username: { type: String, index: true, required: true, unique: true },
  score: { type: Number, default: 0, min: 0, max: MAX_SCORE },
  hasFinished: { type: Boolean, default: false },
}, {
  timestamps: true,
});

userSchema.static('findOneOrCreate', function (name, callback) {
  this.findOne(name, (err, model) => {
    if (model) {
      return callback(err, model);
    }

    return this.create(name, (err, model) => {
      callback(err, model);
    });
  });
});

const User = mongoose.model('Score', userSchema);

module.exports = User;
