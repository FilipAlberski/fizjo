import React from 'react';
import { useSelector } from 'react-redux';

// inteface for the alert state

interface IAlertState {
  alert: {
    message: string; // success, error, info, warning
    type: string;
  };
}

const Alert = () => {
  const { message, type } = useSelector(
    (state: IAlertState) => state.alert
  );

  if (!message) return null;

  if (message) {
    return (
      <div
        className={`alert alert-${type} absolute w-80 top-6 left-6`}
      >
        <p>{message}</p>
      </div>
    );
  }
};

export default Alert;
