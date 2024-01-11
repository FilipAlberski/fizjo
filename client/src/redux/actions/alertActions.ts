//alert actions
import { Dispatch } from '@reduxjs/toolkit';
import { setAlert, clearAlert } from '../slices/alertSlice';

export const set5SecAlertAction =
  (message: string, type: string) => (dispatch: Dispatch) => {
    dispatch(setAlert({ message, type }));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
  };

export const setAlertWithConfirmAction =
  (message: string, type: string) => (dispatch: Dispatch) => {
    dispatch(setAlert({ message, type }));
  };

export const setConfirmAction = () => (dispatch: Dispatch) => {
  dispatch(clearAlert());
};

export const clearAlertAction = () => (dispatch: Dispatch) => {
  dispatch(clearAlert());
};

export const set10SecAlertAction =
  (message: string, type: string) => (dispatch: Dispatch) => {
    dispatch(setAlert({ message, type }));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 10000);
  };
