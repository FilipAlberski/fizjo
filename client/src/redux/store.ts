import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { apiSlice } from './slices/api/apiSlice';
import alertSlice from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
