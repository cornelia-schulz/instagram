import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const User = ({ username, fullName }) => 
    !username || !fullName ? (
        <Skeleton count={1} height={61} />        
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex justify-between col-span-1">
            <img
              className="rounded-full w-16 h-16 mr-1"
              src={`/images/avatars/${username}.jpg`}
              alt={`${username} profile picture`}
            />
          </div>
          <div className="col-span-3">
            <p className="font-bold text-sm">{username}</p>
            <p className="text-sm">{fullName}</p>
          </div>
        </Link>
    );
    
export default memo(User);