import React from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  // destructure user by using following syntax
  // then you don't have to type user.fullName
  // if user does not exist, it will default to an empty object by adding = {}
  const { user: { docId, userId, following, followers, username, fullName } = {} } = useUser();

    return (
      <div className="p-4">
        <User username={username} fullName={fullName} />
        <Suggestions userId={userId} />
      </div>
    )
}