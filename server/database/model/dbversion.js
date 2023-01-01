
module.exports = (conn) => {
  return conn.model('DBVersion', {
    version: String
  }, 'dbversion');
}