/**
* Constants for the point value of github events
* E.g. - a pull request is worth 2 points
*/

// See event list https://developer.github.com/webhooks/
const scoreValues = {
  PULL_REQUEST: 1, // https://developer.github.com/v3/activity/events/types/#pullrequestevent
};

module.exports = scoreValues;
