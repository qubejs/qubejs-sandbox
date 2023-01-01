module.exports = {
  urls: {
    protected: ['/dashboard']
  },
  urlMapping: {
    home: '/content/en/home',
    '/content/(.*)': {
      type: 'regex',
      target: '/content/$1'
    }
  }
};
