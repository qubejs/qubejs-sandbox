module.exports = function (conn) {
  return {
    DbVersion: require('./dbversion')(conn),
  };
};
