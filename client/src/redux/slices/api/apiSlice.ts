import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User', 'Appointments'],
  endpoints: (builder) => ({}),
});
