module.exports = {
  server: {
    host: process.env.HOST_URL || 'https://test.yourdomain.com'
  },
  db: {
    connection: 'mongodb://',
    username: '',
    password: '',
    port: '27017',
    dbname: 'qbjs-sandbox-prod',
    host: 'localhost'
  }
};
