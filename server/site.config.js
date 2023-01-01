var packageJson = require('../package.json');
const envConfig = require('../config/environment');

module.exports = {
  theme: 'basic',
  analytics: envConfig.analytics,
  launchConfig: {
    '/content/en/sales-*': {
      start: '2022-03-20T03:30:00.000Z',
      end: '2022-03-21T03:30:00.000Z',
    },
  },
  siteMap: {
    maxNavigationLevel: 2,
    appVersion: packageJson.version,
    title: 'QubeJS Sandbox',

    errorRedirects: {
      500: '/content/pages/error',
      404: '/content/pages/404',
      launchSoon: '/content/pages/wait',
      launchEnded: '/content/pages/ended',
    },
    globalNavigation: {
      className: 'sq-global-navigation--bordered sq-global-navigation--blured',
      classes: {
        wrapper: 'container',
      },
      mobileItems: [],
      rightItems: [],
    },
    globalNavigationLoggedIn: {
      mobileItems: [],
      rightItems: [],
    },
    globalFooter: {
      classes: {
        item: 'col-xs-12 col-sm-6',
      },
      className: 'sq-footer--light',
      copyrights: '© Nybble Core Pvt. Ltd., All Rights Reserved',
    },
    logo: {
      text: '',
      name: 'logo-full',
      imgAlt: 'logo image',
      size: 'dan-wide',
      className: '',
      variant: 'primary',
      href: 'home',
    },

    children: [
      {
        title: 'Link 1',
        href: '/content/en/portal/knowledge-base',
        children: [
          {
            title: 'Sub Menu',
            href: '/content/en/portal/knowledge-base',
          },
          {
            title: 'Sub Menu',
            href: '/content/en/portal/documents',
          },
          {
            title: 'Sub Menu',
            href: '/content/en/portal/tickets',
          },
        ],
      },
      {
        title: 'Navigation 2',
        href: '/content/en/portal/documents',
      },
      {
        title: 'Nav 3',
        href: '/content/en/portal/tickets',
      },
    ],
  },
};
