import { FieldValue, firebase } from '../lib/firebase';
import FirebaseContext from '../context/firebase';
import { useContext } from 'react';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  return user;
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followingUserIds)
    .get();

    const userFollowedPhotos= result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));

    const photoWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }
        const user = await getUserByUserId(photo.userId);
        const username = user[0].username;
        return { username, ...photo, userLikedPhoto };
      })
    )
    
    return photoWithUserDetails;
}

export async function getSuggestedProfiles(userId) {
  const result = await firebase.firestore().collection('users').limit(10).get();
  const [{ following }] = await getUserByUserId(userId);
      
  return result.docs
      .map((user) => ({ ...user.data(), docId: user.id }))
      .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateUserFollowing(docId, profileId, isFollowingProfile) {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isFollowingProfile 
      ? FieldValue.arrayRemove(profileId) 
      : FieldValue.arrayUnion(profileId)
    })
}

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile) {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isFollowingProfile 
      ? FieldValue.arrayRemove(followingUserId) 
      : FieldValue.arrayUnion(followingUserId)
    })
}