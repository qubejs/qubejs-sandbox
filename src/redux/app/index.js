import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    appLoaded: true,
  },
  reducers: {
    setAppLoaded: (state) => {
      state.appLoaded = true;
    },
  },
});


export const { setAppLoaded } = app.actions;
export default app.reducer;
