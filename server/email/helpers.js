const { email } = require('sq-core/server');
const dataItems = {
  HEADER: require('./parts/header.html'),
  FOOTER: require('./parts/footer.html'),
  STYLES: require('./parts/styles.html'),
  LOGO: '<img src="https://healthcheck.com/assets/logo-wide.svg"/>'
};

function __processBody(html, data) {
  return email.processBody(html, {
    ...dataItems,
    ...data
  });
}

module.exports = {
  processBody: __processBody
};
