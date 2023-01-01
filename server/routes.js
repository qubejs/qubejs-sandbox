var apiConfig = require('./api.config');
var middleWare = require('./middleware');

var version = apiConfig.version;
var prefix = apiConfig.prefix;

var apis = {
  '/hooks': require('./' + prefix + '/' + version + '/hooks')
};

module.exports = function (app) {
  Object.keys(apis).forEach(function (routerName) {
    var apiRoutes = apis[routerName]();
    app.use('/api/' + version + routerName, middleWare, apiRoutes);
  });
};
