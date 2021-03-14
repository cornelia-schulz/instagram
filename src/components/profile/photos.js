import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Photos ({ photos }) {
  console.log(photos)
  return (
    <div className="container grid grid-cols-3 gap-1">
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo.docId} className="group relative">
            <img src={photo.imageSrc} alt={photo.caption} />
            <p className="absolute inset-1/2 text-3xl text-transparent group-hover:text-white">{photo.comments.length}</p>
          </div>
        ))
      ) : ( 
        <div>
        <p>There are no posts yet</p>
        <Skeleton
          className="mb-5"
          count={9}
          height={400}
          width={320}
        />
        </div>
      )}
    </div>
  )
}