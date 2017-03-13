const User = require('../../models/user');
const PullRequest = require('../../models/pullRequests');
const scoreConstants = require('../../constants/score_values');

const {
  PULL_REQUEST
} = scoreConstants;

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
      if (doc.score !== 100) {
        User.update({ username }, { $inc: { score: 1 } });
        PullRequest.create(createPullRequest);
        res.sendStatus(200);
      }
    });
  }
};
