const mongoose = require('mongoose');

const pullRequestSchema = mongoose.Schema({
  username: { type: String, index: true, required: true }, // The username to whom the pull request belongs
  url: { type: String, required: true }, // HTML url to the pull request
  title: { type: String, required: true }, // Title of the pull request
  pullRequestCreated: { type: Date, required: true }, // Date that the pull request was created
  pullRequestMerged: { type: Date, required: true }, // Date that the pull request was merged
}, {
  timestamps: true,
});

const pullRequest = mongoose.model('PullRequest', pullRequestSchema);

module.exports = pullRequest;
