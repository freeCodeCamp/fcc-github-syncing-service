const crypto = require('crypto');

/**
 * Github webhook express middleware
 *
 * @param {config} object
 */

function config (config) {

  if (typeof config !== 'object') {
    throw new TypeError('You must pass a config object to the github webhook function.');
  }

  const {
    secret, // String - github webhook secret
    whitelistEvents, // Array - github events to handle
  } = config;

  // Mandatory
  if (typeof secret !== 'string') {
    throw new TypeError('secret must be a string in github webhook.');
  }
  // Optional
  if (whitelistEvents && !Array.isArray(whitelistEvents)) {
    throw new TypeError('whitelistEvents must be an array in github webhook.');
  }

  /**
   * Return true if the event is legitimate
   *
   * @return {boolean}
   * @param {string} event
   */

  function isAValidEvent(event) {
    const githubWebhookEvents = {
      '*': true,
      commit_comment: true,
      create: true,
      delete: true,
      deployment: true,
      deployment_status: true,
      fork: true,
      gollum: true,
      issue_comment: true,
      issues: true,
      label: true,
      member: true,
      membership: true,
      milestone: true,
      organization: true,
      org_block: true,
      page_build: true,
      project_card: true,
      project_column: true,
      project: true,
      public: true,
      pull_request_review_comment: true,
      pull_request_review: true,
      pull_request: true,
      push: true,
      repository: true,
      release: true,
      status: true,
      team: true,
      team_add: true,
      watch: true
    };

    return githubWebhookEvents[event] ? true : false;
  }

  /**
   * Express middleware
   *
   * @param {object} req - express req
   * @param {object} res - express res
   * @param {function} next - express middleware next call
   */

  function middleware(req, res, next) {
    const event = req.headers['x-github-event']; // Name of the event that triggered this delivery.
    const signature = req.headers['x-hub-signature']; // HMAC hex digest of the payload, using the hook's secret as the key (if configured).
    const deliveryId = req.headers['x-github-delivery']; // Unique ID for this delivery.

    // Return status 200 if the event is not in the whitelist
    if (whitelistEvents.length && ~whitelistEvents.indexOf(event)) {
      return res.sendStatus(200);
    }

    // Return status 400 if required headers are not present
    if ((!event && !isAValidEvent(event)) || !signature || !deliveryId) {
      return res.sendStatus(400);
    }

    // Verify the signature
    let data;
    try {
      data = JSON.stringify(req.body);
    } catch (e) {
      return res.sendStatus(400);
    }
    const createHmac = crypto.createHmac('sha1', secret);
    const computedSignature = createHmac.update(data).digest('hex');
    const signaturesDoNotMatch = computedSignature !== deliveryId;

    if (signaturesDoNotMatch) {
      return res.sendStatus(401);
    }

    // At this stage, the request has been handled and validated.
    // Insert githubWebhook prop into req then call next
    req.githubWebhook = {
      headers: {
        event,
        signature,
        deliveryId,
      },
      body: req.body
    };

    next();
  }

  return middleware;
}

module.exports = config;
