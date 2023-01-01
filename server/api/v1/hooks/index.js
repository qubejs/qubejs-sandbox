var express = require('express');
var { Response } = require('sq-core/server');

var router = express.Router();

module.exports = function (bridge) {
  router.post('/test', async (req, res) => {
    res.send(
      new Response({
        data: 'test',
      }).success()
    );
  });
  return router;
};
