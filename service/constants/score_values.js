/**
* Constants for the point value of github events
* E.g. - a pull request is worth 1 points
*/

// See event list https://developer.github.com/webhooks/ & https://developer.github.com/v3/activity/events/types
const scoreValues = {
  ISSUES:         1,
  PULL_REQUEST:   1,
};

module.exports = scoreValues;
