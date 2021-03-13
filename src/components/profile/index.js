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
    console.log(profileInfo, 'hello')
    async function getProfileInfoAndPhotos() {
      const { ...user } = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);
      console.log(user, photos, 'user');
    }
    getProfileInfoAndPhotos();
  }, [username])

  return (
    <>
      <Header />
      <Photos />
    </>
  ) 
}