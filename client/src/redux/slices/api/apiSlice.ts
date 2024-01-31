import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    console.log('401 error, trying to refresh token');
    const refreshResult = await api.endpoints.refresh();
    if (refreshResult.error) {
      return refreshResult;
    }
    result = await baseQuery(args, api, extraOptions);
  }
};

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User'],

  endpoints: (builder) => ({}),
});
