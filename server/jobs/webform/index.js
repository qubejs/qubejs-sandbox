const _ = require('lodash');
const { utils } = require('sq-core/server');
const JOB_WEBFORM_INTERVAL = process.env.JOB_WEBFORM_INTERVAL || '1m';

const log = (message) => {
  console.log(`JobScheduler:: webform -> ${message}`);
};


module.exports = {
  run: async (context, options) => {
    const timeStart = utils.datetime.now();
    log('webform process request - start::' + utils.datetime.now().toString());
    // log(options);
    
    // your app logic

    const timeEnd = utils.datetime.now();
    // your code
    log('webform process request - end::' + utils.datetime.now().toString());
    log(`process took ${timeEnd.diffInSeconds(timeStart)}s`);
  },
  frequency: JOB_WEBFORM_INTERVAL,
  type: 'interval',
  runAtStart: true
};
