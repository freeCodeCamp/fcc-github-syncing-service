const { expect } = require('chai');
const githubWebhookApi = require('../service/lib/github-webhook-api');

describe('github-webhook-api', function() {
  describe('#config()', function() {
    it('Throws TypeError if a config object is not passed', function() {
      expect(githubWebhookApi).to.throw(TypeError);
    });
    it('Throws TypeError if secret is not a string', function() {
      expect(() => githubWebhookApi({ secret: 1, whitelistEvents: [] })).to.throw(TypeError);
    });
    it('Throws TypeError if whitelistEvents is not an array', function() {
      expect(() => githubWebhookApi({ secret: '', whitelistEvents: 1 })).to.throw(TypeError);
    });

  });
});
