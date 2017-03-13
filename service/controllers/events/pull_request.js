const Score = require('../../models/score');
const scoreConstants = require('../../constants/score_values');

const {
  PULL_REQUEST
} = scoreConstants;

module.exports = (req, res) => {
  const points = PULL_REQUEST;

  res.sendStatus(200);
};
