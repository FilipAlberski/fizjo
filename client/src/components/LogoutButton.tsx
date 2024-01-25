import React from 'react';
import { useDispatch } from 'react-redux';
import { useSendLogoutMutation } from '../redux/slices/api/authApiSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const [sendLogout, { isLoading, error }] = useSendLogoutMutation();
  return (
    <button
      className="btn w-full max-w-xs"
      onClick={async () => {
        try {
          await sendLogout().unwrap();
        } catch (error: any) {
          console.log(error.data.message);
        }
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
