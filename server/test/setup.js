process.env.NODE_ENV = 'test';
var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

console.log('setting up for>>>>' + process.env.NODE_ENV);

before(async () => {
  console.log('-------before-----all start');
});
after(async () => {
  console.log('-------after-----all end');
})