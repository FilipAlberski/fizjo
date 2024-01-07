import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['User', 'Appointments'],
  endpoints: (builder) => ({}),
});
