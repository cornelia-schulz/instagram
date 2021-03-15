import React, { useState, useContext, useEffect } from 'react';
import useUser from '../../hooks/use-user';
import Skeleton from 'react-loading-skeleton';

export default function Header ({
  photoCount,
  followerCount,
  setFollowerCount,
  profile: { docId: docId, userId: userId, fullName, following, followers},
  username
}) {
  console.log(fullName)
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
        <div className="container flex mt-4">
          {followerCount === undefined || following === undefined ? (
            <Skeleton
              count={1}
              height={24}
              width={677}
            />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photoCount}</span> posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span> { followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          {fullName === undefined ? (
            <Skeleton
              count={1}
              height={24}
              width={677}
            />
          ) : (
            <p>{fullName}</p>
          )}
        </div>
      </div>
    </div>
  )
}