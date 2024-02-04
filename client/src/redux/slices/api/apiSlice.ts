import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../authSlice';

// Define interfaces for the auth state and the app state.
interface AuthState {
  token: string | null;
}

interface AppState {
  auth: AuthState;
}

// Define a type for the function that returns the app state.
type GetState = () => AppState;

// Base query function with authorization header configuration.
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers, { getState }: { getState: GetState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// Enhanced base query function for handling token refresh logic.
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('Token expired. Refreshing token...');

    const refreshToken = await baseQuery(
      '/auth/refresh',
      api,
      extraOptions
    );

    if (refreshToken?.data) {
      api.dispatch(setCredentials(refreshToken.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data.message =
          'Session expired. Please log in again.';

        return refreshToken;
      }
    }
  }
};

// Creation of the API slice with the reauthentication-enriched base query.
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}), // Define your endpoints here.
});
