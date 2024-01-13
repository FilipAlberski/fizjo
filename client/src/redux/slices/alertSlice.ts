import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alert {
  id: number;
  message: string;
  type: string;
  howLong?: number;
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

let nextAlertId = 0;

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<Alert, 'id'>>) => {
      state.alerts.push({ id: nextAlertId++, ...action.payload });
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
