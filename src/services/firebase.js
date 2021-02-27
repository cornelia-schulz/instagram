import { firebase } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
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
  const [{ following: userFollowing = [] }] = result.docs
    .map((user) => user.data())
    .filter((profile) => profile.userId === userId);

    return result.docs
      .map((user) => ({ ...user.data(), docId: user.id }))
      .filter((profile) => profile.userId !== userId && !userFollowing.includes(profile.userId));
}