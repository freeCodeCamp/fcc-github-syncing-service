const githubWebhookApi = require('../lib/github-webhook-api');
const events = require('../controllers');

const webhook = githubWebhookApi({
  secret: process.env.SECRET
});

module.exports = app => {
  app.get('*', (req, res) => {
    res.send('Hello');
  });

  app.post('/webhook', webhook, (req, res) => {
    /**
    * Event types to handle - see ref https://developer.github.com/v3/activity/events/types/#pullrequestevent
    */
    const event = req.headers['x-github-event'];

    switch(event) {
      case 'ping':
        events.ping(req, res);
        break;
      case 'pull_request':
        events.pullRequest(req, res);
        break;
      default:
        res.sendStatus(200);
    }
  });
};
