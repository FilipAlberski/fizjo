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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('login');
    //pass and email
    console.log(email, password);
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
