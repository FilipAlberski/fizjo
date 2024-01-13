import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../redux/slices/alertSlice';

interface IAlertState {
  alert: {
    alerts: {
      id: number;
      message: string;
      type: string;
      delay?: number;
    }[];
  };
}

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(
    (state: IAlertState) => state.alert.alerts
  );
  const alertTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const [hoveredAlert, setHoveredAlert] = useState<number | null>(
    null
  );
  const [progressValues, setProgressValues] = useState<{
    [key: number]: number;
  }>({});

  const updateProgress = (alertId: number, delay: number) => {
    const interval = 50; // Update every 50 ms
    const increment = (interval / delay) * 100;
    let progress = 0;

    const intervalId = setInterval(() => {
      progress += increment;
      setProgressValues((prevValues) => ({
        ...prevValues,
        [alertId]: Math.min(progress, 100),
      }));
    }, interval);

    return intervalId;
  };

  const removeAlertWithDelay = (
    alertId: number,
    delay: number = 5000
  ) => {
    clearTimeout(alertTimeouts.current[alertId]);
    const intervalId = updateProgress(alertId, delay);

    alertTimeouts.current[alertId] = setTimeout(() => {
      clearInterval(intervalId); // Clear progress interval
      if (hoveredAlert !== alertId) {
        dispatch(removeAlert(alertId));
      }
    }, delay);
  };

  useEffect(() => {
    alerts.forEach((alert) => {
      removeAlertWithDelay(alert.id, alert.delay);
    });
    return () => {
      Object.values(alertTimeouts.current).forEach(clearTimeout);
      Object.values(progressValues).forEach(clearInterval);
    };
  }, [alerts, dispatch, hoveredAlert, progressValues]);

  const handleMouseEnter = (alertId: number) => {
    setHoveredAlert(alertId);
    clearTimeout(alertTimeouts.current[alertId]);
    clearInterval(progressValues[alertId]);
  };

  const handleMouseLeave = (alertId: number, delay?: number) => {
    setHoveredAlert(null);
    removeAlertWithDelay(alertId, delay);
  };

  return (
    <div className="absolute w-80 top-0 left-0 m-4 z-50 flex flex-col gap-3 max-h-screen overflow-hidden">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type} flex flex-col gap-2`}
          onMouseEnter={() => handleMouseEnter(alert.id)}
          onMouseLeave={() => handleMouseLeave(alert.id, alert.delay)}
        >
          <p>{alert.message}</p>
          <progress
            className="progress progress-primary w-full"
            value={500}
            max="5000"
          ></progress>
        </div>
      ))}
    </div>
  );
};

export default Alert;
