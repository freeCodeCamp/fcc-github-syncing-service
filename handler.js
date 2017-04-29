require('dotenv').config();

const awsGithubWebhookMiddleware = require('./lib/awsGithubWebhookMiddleware');
const { events } = require('./controllers');

const webhook = awsGithubWebhookMiddleware({
  secret: process.env.SECRET
});

module.exports.fccSyncEndpoint = (event, context, callback) => {

  // Call the webhook lib - this is a simple function that verifies the SHA1 signature from github against
  // The environment variable SECRET, which must match the secret in the github webhook config
  // It is synchronous and returns true (valid) or false (invalid)
  const githubWebhookIsValid = webhook(event);

  if (githubWebhookIsValid) {
    const githubEvent = event.headers['X-GitHub-Event'];

    switch(githubEvent) {
      case 'ping':
        events.ping(githubEvent);
        break;
      case 'pull_request':
        events.pullRequest(githubEvent);
        break;
    }
    // We can immediately return a response here as we'll handle the process through one of the controllers
    callback(null, { message: 'Post request was valid.' });
  } else {
    callback({ message: 'Post request was invalid.' });
  }
};
