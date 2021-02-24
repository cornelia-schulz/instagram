import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();
  // const photos = ['/images/users/raphael/1.jpg', '/images/users/raphael/2.jpg', '/images/users/raphael/3.jpg', '/images/users/raphael/4.jpg', '/images/users/raphael/5.jpg']

  console.log(photos)
  return (
    <div>
      {photos ? (
        photos.map((photo, index) => (
          <div key={index}>
            <img src={photo.imageSrc} alt="user image"/>
            <p>{photo.username}</p>
          </div>
          
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