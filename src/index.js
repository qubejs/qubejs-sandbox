import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { cordova, components, containers, ui, utils, root } from 'sq-core/web';
import './styles/main.scss';
import containers_all from './containers';
import i18n from './i18n';
import CustomPortalApp from './containers/App';
import appComponents from './components';
import './error-messages';

import theme from './theme';
import { store } from './redux';

import config from './config';
import analytics from './utils/analytics';
import allHistory from './history';

import './utils/custom-formatters';
import './icons';


const { isApp } = cordova;
const { addComp } = components;
const { addComp: addUiComp } = ui;
const { DynamicContent } = containers;
const {
  translate: { loadLanguages },
  redirect: { setUrlMapping, setHistory },
  addParsers,
} = utils;

const history = isApp() ? allHistory.hash() : allHistory.browser();
addComp({
  ...appComponents,
});
addUiComp({
  ...appComponents,
});
loadLanguages(i18n);

DynamicContent.registerContainers({
  ...containers_all,
});

setHistory(history);
setUrlMapping(config.urlMapping);

var app = {
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  initApp: function () {},
  onDeviceReady: function (direct) {
    if (!direct) {
      this.initApp();
    }
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <CustomPortalApp onAnalytics={analytics.doAnalytics} />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  },
};
if (isApp()) {
  app.initialize();
} else {
  app.onDeviceReady(true);
}
const setFullHeight = () => {
  document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px');
};
window.addEventListener('resize', () => {
  setFullHeight();
});
// addParsers({
//   ...parsers,
// });
setFullHeight();
