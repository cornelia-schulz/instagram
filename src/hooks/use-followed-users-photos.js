import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const { user: { uid: userId = '' } } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getUserByUserId(userId);

      if (followingUserIds && followingUserIds[0].following.length > 0) {
          const followedUserIds = await getUserByUserId(userId, followingUserIds[0].following);
          
          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
          setPhotos(followedUserPhotos);
      }
    }
  
  getTimelinePhotos();
  console.log('photos', photos)
  }, [userId]);

  return { photos };
}