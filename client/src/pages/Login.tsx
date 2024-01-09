import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail('');
      setPassword('');
      navigate('/dashboard'); // or wherever you want to redirect after login
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="form flex flex-col items-center bg-neutral rounded-xl gap-4 p-4">
        <h1 className="text-3xl text-center mb-7 text-primary">
          Login
        </h1>
        <input
          type="text"
          placeholder="email"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="password"
          className="input w-full max-w-xs"
        />
        <button
          type="submit"
          className="btn btn-primary w-full max-w-xs"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
