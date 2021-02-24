import React, { useEffect, useRef } from 'react';
import Comments from './comments';
import Actions from './actions';
import Footer from './footer';
import Header from './header';
import Image from './image';


export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded border col-span-4 bg-white mb-16">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  )
}