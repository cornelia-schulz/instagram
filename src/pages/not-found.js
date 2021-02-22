import React, { useEffect } from 'react';

export default function NotFound() {

  useEffect(() => {
    document.title = '404 - Not Found';
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="mx-auto max-w-screen-lg content-center">
        <p className="text-center text-4xl">Not Found</p>
      </div>
    </div>
  )
}