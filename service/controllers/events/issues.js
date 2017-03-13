const Score = require('../../models/score');
const scoreConstants = require('../../constants/score_values');

const {
  ISSUES
} = scoreConstants;

module.exports = (req, res) => {
  const points = ISSUES;
  const body = req.body;
  const username = body.issue.user.login;

  Score.findOneOrCreate({ username }, (err, doc) => {
    console.log(doc);
  });

  res.sendStatus(200);
};
