import { configureStore } from '@reduxjs/toolkit';
import 'whatwg-fetch';
import { reducers } from 'sq-core/web';
import auth from './auth';
import app from './app';

const store = configureStore({
  reducer: {
    auth,
    app,
    common: reducers.common.default,
    content: reducers.content.default,
  },
});

export { store };
