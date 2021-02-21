import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setEmail('');
      setPassword('');
      setError(error.message);
    }
  }

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
      <div className="flex flex-col items-center bg-white p-4 border mb-4">
        <h1 className="flex justify-center w-full">
          <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
        </h1>
        <form method="POST" onSubmit={handleLogin}>
          <input
            aria-label="Enter your email address"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email address"
            value={email}
          />
          <input
            aria-label="Enter your password"
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            value={password}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full rounded h-12 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
          >
            Log In
          </button>
        </form>
      </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}