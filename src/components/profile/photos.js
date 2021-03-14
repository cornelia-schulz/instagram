import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Chat from '/images/chat.svg';

export default function Photos ({ photos }) {
  // TODO add lightbox on click of image
  return (
    <div className="container border-t border-gray mt-12 pt-4">
      {!photos ? (
        <>
          {[...new Array(9)].map((_, index) => (
            <Skeleton
              className="mb-5"
              count={1}
              height={400}
              key={index}
              width={320}
            />
          ))}
        </>
      ) : photos.length > 0 ? ( 
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mt-4 pb-12">
          {photos.map((photo) => (
            <div key={photo.docId} className="group relative">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="absolute h-10 w-full flex justify-center inset-1/2 inset-x-0 text-2xl text-transparent group-hover:text-white">
                <svg
                  className="h-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  tabIndex={0}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="ml-2 mr-12">{photo.likes.length}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  className="h-10 fill-current"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z"/>
                  </g>
                </svg>
                <span className="ml-2">{photo.comments.length}</span>
              </div>
            </div>
          ))
          }
        </div>
      ) : null}
      {!photos || photos.length === 0 && <p className="text-center text-2xl">There are no posts yet</p>}
    </div>
  )
}