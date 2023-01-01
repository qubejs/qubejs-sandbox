var message = 'Here is your one-time passcode ##data.passcode## for Health Check';
const helpers = require('../email/helpers');

module.exports = (data) => {
  const outputHtml = helpers.processBody(message, data);
  return {
    subject: `One-time passcode`,
    body: outputHtml
  };
};
