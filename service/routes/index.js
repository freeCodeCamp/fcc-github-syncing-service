const api = require('./api');
const events = require('./events');

module.exports = app => {
  /**
  * Expose public API
  */
  api(app);

  /**
  * Handle GitHub webhook post requests
  */
  events(app);
};
