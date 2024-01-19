import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../redux/slices/alertSlice';
import { IoClose } from 'react-icons/io5';

//test commit

interface IAlertState {
  alert: {
    alerts: {
      id: number;
      message: string;
      type: string;
      howLong: number;
    }[];
  };
}

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(
    (state: IAlertState) => state.alert.alerts
  );

  return (
    <div className="absolute top-0 left-0 p-4 z-50 flex flex-col gap-3 max-h-screen overflow-hidden">
      {alerts.map((alert) => (
        <div
          className={`rounded-xl p-3 pt-2 alert alert-${alert.type} flex flex-col gap-1`}
        >
          <div
            key={alert.id}
            className={`flex w-full justify-between min-w-80`}
          >
            <div className="max-w-70">{alert.message}</div>

            <button onClick={() => dispatch(removeAlert(alert.id))}>
              <IoClose size={25} className="text-primary" />
            </button>
          </div>
          <progress
            className="progress w-full"
            value="40"
            max="100"
          ></progress>
        </div>
      ))}
    </div>
  );
};

export default Alert;
