require('dotenv').config();
var _ = require("lodash");
var defaults = require("./default.js");
var enviroment = process.env.CONFIG_ENV || process.env.NODE_ENV || 'development';
var config = require("./" + (enviroment) + ".js");

module.exports = _.merge({
  env: enviroment
}, defaults, config);
