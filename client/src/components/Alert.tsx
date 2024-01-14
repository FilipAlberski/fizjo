import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../redux/slices/alertSlice';

interface IAlertState {
  alert: {
    alerts: {
      id: number;
      message: string;
      type: string;
    
    }[];
  };
}

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(
    (state: IAlertState) => state.alert.alerts
  );
 
  return (
    <div className="absolute w-80 top-0 left-0 m-4 z-50 flex flex-col gap-3 max-h-screen overflow-hidden">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-${alert.type}-400 text-white text-center py-2 px-4 rounded`}
        >
          {alert.message}
          <button
            className="float-right"
            onClick={() => dispatch(removeAlert(alert.id))}
          >
            X
          </button>

      
    </div>
  );
};

export default Alert;
