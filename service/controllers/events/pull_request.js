const User = require('../../models/user');
const PullRequest = require('../../models/pullRequests');
const { scoreValues, MAX_SCORE } = require('../../constants');

const {
  PULL_REQUEST
} = scoreValues;

module.exports = (req, res) => {
  const points = PULL_REQUEST;
  const body = req.body;

  // Check if the pull request was just closed & merged
  const action = body.action;
  const merged = body.pull_request.merged;
  if (action && merged) {
    const username = body.pull_request.user.login;
    const url = body.pull_request.html_url;
    const title = body.pull_request.title;
    const pullRequestCreated = body.pull_request.created_at;
    const pullRequestMerged = body.pull_request.merged_at;

    const createPullRequest = {
      username,
      url,
      title,
      pullRequestCreated,
      pullRequestMerged,
    };

    User.findOneOrCreate({ username }, (err, doc) => {
      // User has not achieved the MAX_SCORE
      const userHasNotFinished = doc.score !== MAX_SCORE && !doc.hasFinished;
      if (userHasNotFinished) {
        // User.score += 1
        User.update({ username }, { $inc: { score: 1 } }, { runValidators: true }, () => {
          // If the current doc score has been updated to the MAX_SCORE
          const docIsNowAtTheMaxScore = doc.score === MAX_SCORE - 1;
          if (docIsNowAtTheMaxScore) {
            // User.hasFinished = true
            User.update({ username }, { $set: { hasFinished: true } }, { runValidators: true }, () => {});
          }
        });
        PullRequest.create(createPullRequest);
      }
    });
  }

  res.sendStatus(200);
};
