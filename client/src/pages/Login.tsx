import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';

import { Link } from 'react-router-dom';
import { addAlert } from '../redux/slices/alertSlice';

const Login = () => {
  const [email, setEmail] = useState(''); //to change the function of tracking input
  const [password, setPassword] = useState(''); //to change the function of tracking input

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  //set test alert for 5 seconds

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(accessToken));
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error: any) {
      dispatch(
        addAlert({
          id: 1,
          type: 'error',
          message: error.data.message,
          howLong: 5000,
        })
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center overflow-y-hidden">
      <form className="form flex flex-col items-center bg-neutral rounded-xl gap-4 p-4">
        <h1 className="text-3xl text-center mb-7 text-primary">
          Login
        </h1>
        <input
          type="text"
          placeholder="email"
          className="input w-full max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input w-full max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary w-full max-w-xs"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
