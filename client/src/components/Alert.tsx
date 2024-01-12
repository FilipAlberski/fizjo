import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../redux/slices/alertSlice';

//TODO: nie dziala hover na alertach, trzymanie myszy na alercie nie sprawia ze sie nie zamyka
//TODO: dodac linear loading bar na dole kazdego alertu ktory sie zamyka po 5 sekundach

interface IAlertState {
  alert: {
    alerts: {
      id: number;
      message: string;
      type: string;
      delay?: number; // Make delay optional
    }[];
  };
}

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(
    (state: IAlertState) => state.alert.alerts
  );
  const alertTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const removeAlertWithDelay = (
    alertId: number,
    delay: number = 5000
  ) => {
    // Default delay of 5000
    clearTimeout(alertTimeouts.current[alertId]); // Clear existing timeout
    alertTimeouts.current[alertId] = setTimeout(() => {
      dispatch(removeAlert(alertId));
    }, delay);
  };

  useEffect(() => {
    alerts.forEach((alert) => {
      removeAlertWithDelay(alert.id, alert.delay); // Use the alert's delay or default
    });

    // Cleanup timeouts on unmount
    return () => {
      Object.values(alertTimeouts.current).forEach(clearTimeout);
    };
  }, [alerts, dispatch]);

  const handleMouseEnter = (alertId: number) => {
    clearTimeout(alertTimeouts.current[alertId]); // Pause timeout on hover
  };

  const handleMouseLeave = (alertId: number, delay?: number) => {
    removeAlertWithDelay(alertId, delay); // Restart timeout on mouse leave
  };

  return (
    <div className="absolute w-80 top-0 left-0 m-4 z-50 flex flex-col gap-3 max-h-screen overflow-hidden">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
          onMouseEnter={() => handleMouseEnter(alert.id)}
          onMouseLeave={() => handleMouseLeave(alert.id, alert.delay)}
        >
          <p>{alert.message}</p>
          <button
            onClick={() => dispatch(removeAlert(alert.id))}
            className="close-btn"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
