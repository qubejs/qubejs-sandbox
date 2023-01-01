const { ArgsReader } = require('sq-core/scripts');
const { WebBuild } = require('sq-core/scripts/build');
const paths = require('../config/paths');
const appConfig = require('../config/config.app');
const packageJson = require('../package.json');
const paramsEnv = new ArgsReader().get();
const env = paramsEnv.env || 'production';
process.env.CONFIG_ENV = env;

const config = require('../config/environment');
const chalk = require('react-dev-utils/chalk');

console.log(chalk.green('env = ' + env));
console.log(chalk.yellow('building web'));
const objBuilder = new WebBuild({
  version: appConfig.appVersion,
  indexHtml: paths.appBuild + '/index.html',
  appConfig: {
    appVersion: packageJson.version,
    source: 'Web'
  },
  scripts: `

  `
});

objBuilder.process().then(() => {
  console.log(chalk.green('web build process completed'));
});
