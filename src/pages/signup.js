import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  // References
  //   - https://firebase.google.com/docs/auth/web/password-auth
  //   - https://cloud.google.com/firestore/docs/manage-data/add-data

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = username === '' || name === '' || email === '' || password === '';

  const validateUsername = (event) => {
    console.log(event);
    setError('');
    if(event.target.value.includes(' ')) {
      setError('Username cannot contain spaces');
    } else {
      setUsername(event.target.value.toLowerCase());
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    const existingUser = await doesUsernameExist(username);
    if(!existingUser.length) {
      try {
        const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        await createdUserResult.user.updateProfile({
          displayName: username
        });
        
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: name,
          emailAddress: email.toLowerCase(),
          following: [],
          followers:[],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    }
    else {
      setUsername('');  
      setName('');
      setEmail('');
      setPassword('');
      setError('Username already exists. Please pick another one.');
    }
  }

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
      <div className="flex flex-col items-center bg-white p-4 border mb-4">
        <h1 className="flex justify-center w-full">
          <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
        </h1>
        {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
        <form method="POST" onSubmit={handleSignUp}>
        <input
            aria-label="Enter a username"
            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
            type="text"
            onChange={validateUsername}
            placeholder="Username"
            value={username}
          />
          <input
            aria-label="Enter your full name"
            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
            type="text"
            onChange={({ target }) => setName(target.value)}
            placeholder="Full name"
            value={name}
          />
          <input
            aria-label="Enter your email address"
            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
            type="text"
            onChange={({ target }) => setEmail(target.value.toLowerCase())}
            placeholder="Email address"
            value={email}
          />
          <input
            aria-label="Enter your password"
            className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
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
            Sign Up
          </button>
        </form>
      </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}