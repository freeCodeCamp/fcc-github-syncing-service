/**
* Constants for the point value of github events
* E.g. - a pull request is worth 1 points
*/

// See event list https://developer.github.com/webhooks/ & https://developer.github.com/v3/activity/events/types
const scoreValues = {
  PULL_REQUEST_MERGED_POINTS:   1,
};

const MAX_SCORE = 200;

module.exports = {
  scoreValues,
  MAX_SCORE
};
