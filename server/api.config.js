
module.exports = {
  version: 'v1',
  prefix: 'api',
  getUrl: function (relativeUrl) {
    return ['/', this.prefix, '/', this.version, relativeUrl].join('');
  }
};