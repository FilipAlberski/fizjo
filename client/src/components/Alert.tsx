import React, { useEffect, useState, useRef } from 'react';
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
  const [hovered, setHovered] = useState(false);

  const removeAlertAfterDelay = (alertId: number, delay: number) => {
    setTimeout(() => {
      if (!hovered) {
        dispatch(removeAlert(alertId));
      }
    }, delay);
  };

  useEffect(() => {
    alerts.forEach((alert) => {
      removeAlertAfterDelay(alert.id, 5000); // 5 seconds delay
    });
    console.log(alerts);
  }, [alerts, hovered, dispatch]);

  return (
    <div className="absolute w-80 top-0 left-0 m-4 z-50 flex flex-col gap-3 max-h-screen overflow-hidden">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <p>{alert.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Alert;
