import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alert {
  id: number;
  message: string;
  type: string;
  howLong?: number;
}

interface Alert {
  id: number;
  message: string;
  type: string;
  howLong?: number;
}

interface AlertState {
  alerts: Alert[];
}

let nextAlertId = 0;

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: [],
  } as AlertState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push({
        id: nextAlertId++,
        message: action.payload.message,
        type: action.payload.type,
        howLong: action.payload.howLong || 5000,
      });
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
