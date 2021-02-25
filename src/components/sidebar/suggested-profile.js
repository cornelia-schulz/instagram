import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
  }

  return !followed ? (
    <div className="flex flex-row align-items items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`Follow ${username}`}
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div className="flex">
        <button
          className="text-sm font-bold text-blue"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}