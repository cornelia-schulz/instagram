import React, { useState, useContext, useEffect } from 'react';
import useUser from '../../hooks/use-user';

export default function Header ({
  photoCount,
  followerCount,
  setFollowerCount,
  profile,
  username
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== username;  

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-40 flex"
          alt={`${username} profile picture`}
          src={`/images/avatars/${username}.jpg`}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={() => console.log('I am a button')}
            >
              {isFollowingProfile ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}