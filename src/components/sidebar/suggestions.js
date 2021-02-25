import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

const Suggestions = ({ userId }) => {
  const [profiles, setProfiles] = useState([
    {
      docId: 1,
      username: 'dali',
      profileId: '2',
      userId: '3'
    }
  ]);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
    }
    if (userId) {
      suggestedProfiles();
    }

  }, [ userId ])

  return !profiles? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="grid">
      {profiles.map((profile) => (
        <SuggestedProfile
          key={profile.docId}
          userDocId={profile.docId}
          username={profile.username}
          profileId={profile.userId}
          userId={userId}
        />
      ))}
    </div>
  ) : null;
}

export default memo(Suggestions);