const crypto = require('crypto');

/**
 * Github webhook express middleware
 * This is a stripped down conversion of a previous instance of express middleware.
 * Previous ver - https://github.com/AndrewGHC/express-middleware-github-webhooks
 * After configuration, call the returned function with an AWS event with { body, headers } props
 * This needs to be set up manually as Lambda does not automatically include HTTP headers
 * Will return true if the webhook request is valid, false otherwise
 *
 * @param {config} object
 */

function config (config) {

  if (typeof config !== 'object') {
    throw new TypeError('You must pass a config object to the github webhook function.');
  }

  const {
    secret, // String - github webhook secret
  } = config;

  // Mandatory
  if (typeof secret !== 'string') {
    throw new TypeError('secret must be a string.');
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
   * AWS middleware
   *
   * @param {object} event - AWS event with 'body' and 'headers' as props
   */

  function middleware(awsEvent) {
    const { body, headers } = awsEvent;

    const event = headers['X-GitHub-Event']; // Name of the event that triggered this delivery.
    const signature = headers['X-Hub-Signature']; // HMAC hex digest of the payload, using the hook's secret as the key (if configured).
    const deliveryId = headers['X-GitHub-Delivery']; // Unique ID for this delivery.

    // Return false if required headers are not present
    if ((!event && !isAValidEvent(event)) || !signature || !deliveryId) {
      return false;
    }

    // Catch errors should the body be invalid
    let data;
    try {
      data = JSON.stringify(body);
    } catch (e) {
      return false;
    }

    // Verify the signature
    const createHmac = crypto.createHmac('sha1', secret);
    const computedSignature = `sha1=${createHmac.update(data).digest('hex')}`;
    const signaturesDoNotMatch = computedSignature !== signature;

    if (signaturesDoNotMatch) {
      return false;
    }

    // At this stage, the request has been handled and validated.
    return true;
  }

  return middleware;
}

module.exports = config;
