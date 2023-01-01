module.exports = {
  product: {
    name: 'CRM Sandbox'
  },
  reCaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    secretKey: process.env.RECAPTCHA_SERVER_KEY
  },
  email: {
    enabled: false,
    loggerEnabled: false,
    defaultFrom: 'info@nybblecore.com',
    defaultFromName: 'Nybble Core',
    messageBox: 'info@nybblecore.com'
  },
  text: {
    enabled: false,
    loggerEnabled: false
  },
  otp: {
    expiresIn: 60 * 5 // 5 minutes
  },

  analytics: {
    gaTrackingId: 'G-DSF'
  },
  smtpSettings: {
    host: 'server',
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3'
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: 'abc',
      pass: 'gold'
    }
  },
  server: {
    host: 'http://dev.crm-sandbox.com'
  },
  cookie: {
    secret: '1',
    tokenKey: '2',
    checkLoginKey: '3',
    secretKey: 'es',
    maxAge: 3 * 60 * 60 * 1000 // 3 hours
  },
  jwt: {
    secretKey: 'c',
    emailSecretKey: 'v'
  },
  session: {
    secure: true,
    timeout: '3h',
    emailTokenTimeout: '7d'
  },
  privateKey: 'jhkhkjh',
  db: {
    connection: 'mongodb://',
    username: '',
    password: '',
    port: '27017',
    dbname: 'qbjs-sandbox-local',
    host: 'localhost'
  },
  log: 'debug'
};
