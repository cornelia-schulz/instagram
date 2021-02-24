import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    <div className="flex h-4 px-4 py-8">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-10 w-10 mr-4"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile picture`}
          />
          <p>{username}</p>
        </Link>
    </div>
  )
}