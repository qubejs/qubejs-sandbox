import { cordova } from 'sq-core/web';
var mode = 'on';
var GTAG_ID = window.APP_CONFIG.gaTrackingId;
var isDevMode = () => window.APP_CONFIG.MODE === 'development';
var _tagManager = () => window.gtag;
var location = window.location;

const analytics = {
  doAnalytics: (params) => {
    if (!cordova.isApp()) {
      analytics.send(params);
    } else {
      console.log('*** ad mob ');
    }
  },
  init: ({ history }) => {
    // ReactGA.initialize('G-ZEJ5TCSDJ6');
  },
  enable: function () {
    mode = 'on';
  },
  disable: function () {
    mode = 'off';
  },
  send: function ({ type = 'event', ...rest }) {
    if (type && this[type]) {
      this[type](rest);
    } else {
      console.log(`${type} invalid operation`);
    }
  },
  event: function ({ eventName, category, action, label, ...rest }) {
    if (mode === 'on') {
      const params = {
        app_source: window.APP_CONFIG.source || 'Web',
        event_category: category,
        event_action: action,
        event_label: label,
        ...rest
      };
      isDevMode() && console.log('**Analytics-event:', eventName, params);
      _tagManager() && _tagManager()('event', eventName, params);
    }
  },
  pageview: function (data = {}) {
    if (mode === 'on') {
      const params = { page_path: location.pathname, app_source: window.APP_CONFIG.source || 'Web', ...data };
      isDevMode() && console.log('**Analytics-pageview:', location.pathname, params);
      _tagManager() && _tagManager()('config', GTAG_ID, params);
    }
  }
};

export default analytics;
