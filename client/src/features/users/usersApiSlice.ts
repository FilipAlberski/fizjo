import {
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const initialState = usersAdapter.getInitialState();
