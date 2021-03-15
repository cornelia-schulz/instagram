import React, { useEffect, useReducer } from 'react';
import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photoCollection: [],
  followerCount: 0
};

export default function UserProfile({ username }) {
    const [{ profile, photoCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    //think about caching here in localstorage, so you
    // don't make an unnecessary network call here
    const profileInfo = JSON.parse(localStorage.getItem('profileInfo'));
    async function getProfileInfoAndPhotos() {
      const { ...user } = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);
      console.log('user', user)

      dispatch({ 
        profile: user,
        photoCollection: photos, 
        followerCount: user.followers.length 
      })
    }
    getProfileInfoAndPhotos();
  }, [username])

  return (
    <>
      <Header
        photoCount={photoCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={username}
      />
      <Photos photos={photoCollection} />
    </>
  ) 
}