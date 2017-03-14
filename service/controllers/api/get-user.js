const User = require('../../models/user');

module.exports = (req, res) => {
  const username = req.params.user;

  User.findOne({ username }, { '_id': 0, '__v': 0 }, (err, doc) => {
    if (!doc) {
      return res.status(400).json({ message: 'User not found.' });
    }
    return res.json(doc);
  });
};
