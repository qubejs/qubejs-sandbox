var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
require('dotenv').config();
var express = require('express');
var path = require('path');
// var https = require('https');

// var cors = require('cors');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// var { ArgsReader } = require('sq-core/scripts');
const { utils } = require('sq-core/server');
const { ArgsReader } = require('sq-core/scripts');

var {
  server: { ContentServer, JobScheduler }
} = require('sq-core/cms');

var config = require('../config/environment');
var webConfig = require('../src/config');
var routes = require('./routes');

var siteConfig = require('./site.config');
var jobs = require('./jobs');

var app = express();

// Content server
var cmsSever = new ContentServer(
  {
    contentPath: path.resolve('./content'),
    serverPath: '/content/*',
    rootApp: path.resolve('./'),
    damAssets: path.resolve('./dam'),
    clientLibs: path.resolve('./clientlibs'),
    envConfig: config,
    mode: config.env,
    siteConfig: siteConfig
  },
  app
);

new JobScheduler({
  jobs
}).schedule();

cmsSever.init();
cmsSever.mapVanity(webConfig.urlMapping, {
  defaultPage: '/in/reactapp'
});
var args = new ArgsReader();

var passedArgs = args.get();
if (process.env.NODE_ENV === 'production' && process.env.FORCE_HTTPS !== 'false') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
utils.url.setConfig(config);
app.use(
  session({
    genid: function (req) {
      return utils.guid(); // use UUIDs for session IDs
    },
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  })
);

// app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-token, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, x-referer');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  if ('OPTIONS' === req.method) {
    res.status(204).send();
  } else {
    next();
  }
});
app.use('/env/app-config', (req, res) => {
  var appConfig = require('../scripts/app-config');
  res.send(` window.APP_CONFIG = ${JSON.stringify(appConfig)};`);
});
routes(app);

Object.keys(webConfig.urlMapping).forEach((key) => {
  app.use(webConfig.urlMapping[key], (req, res) => {
    return res.sendFile('build/index.html', { root: __dirname + '/..' });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3001);

var httpServer = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + httpServer.address().port + ' on ' + config.env);
});
module.exports = {
  server: httpServer,
  app: app
};
