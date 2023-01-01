// src/history.js
import { createBrowserHistory, createHashHistory } from 'history';

export default {
  browser: createBrowserHistory,
  hash: createHashHistory
};
