var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const { ArgsReader } = require('sq-core/scripts');
const cmds = ['create', 'clean', 'migrate', 'setup', 'check', 'sync'];

const args = new ArgsReader().get();
if (args) {
  var cmd = args.cmd;
  var env = args.env;
  if (env) {
    process.env.NODE_ENV = env;
  }
  const config = require('../../config/environment');
  if (!env) {
    env = config.env;
  }
  if (cmds.indexOf(cmd) > -1) {
    if (env === undefined) {
      console.log('No env found to run on');
      process.exit();
    }
    console.log('running:' + cmd + ' on ' + env);

    require('./' + cmd);
  } else {
    console.log('invalid command supported:' + cmds.join('|'));
    process.exit();
  }
}
