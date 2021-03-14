import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();

  return (
    <div className="container col-span-2">
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <Post key={photo.docId} content={photo} />
        ))
      ) : ( 
        <Skeleton
          className="mb-5"
          count={4}
          height={500}
          width={640}
        />
      )}
    </div>
  )
}