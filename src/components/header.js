import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const handleSignOut = (event) => {
    event.preventDefault();
    if (user) {
      try {
        firebase.auth().signOut();
      } 
      catch(error) {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    if (user) {
      document.title = user.displayName;
    } else {
      document.title = 'Instagram';
    }
  }, []);

  return (
    <header className="h-18 bg-white border-b mb-8 py-4">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1>
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div>
            {user ? (
              <div className="flex">
                <Link to={ROUTES.DASHBOARD} arial-label="Home">
                  <svg
                    className="h-14 my-4 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="SIgn Out"
                  onClick={handleSignOut}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSignOut();
                    }
                  }}
                >
                  <svg
                    className="h-14 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-14 w-14 my-4"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile picture`}
                    />
                  </Link>
              </div>
            ) : (
              <div className="flex">
                <button
                  className="bg-blue-500 px-4 text-white w-full rounded h-12 font-bold"
                  type="button"
                >
                  <Link
                    className="w-full hover:no-underline hover:text-white visited:no-underline visited:text-white"
                    to={ROUTES.LOGIN}
                    aria-label="Log in"
                  >Log In</Link>
                </button>
                <button
                  className="text-blue-500 px-4 w-full h-12 font-bold ml-4"
                  type="button"
                >
                  <Link
                    className="w-full hover:no-underline hover:text-blue-500 whitespace-nowrap visited:text-blue-500 visited:no-underline"
                    to={ROUTES.SIGN_UP}
                    aria-label="Sign up"
                  >Sign Up</Link>
                </button>
              </div>
            )}
            </div>
        </div>
      </div>
    </header>  
  )
}