import React from 'react';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  // destructure user by using following syntax
  // then you don't have to type user.fullName
  // if user does not exist, it will default to an empty object by adding = {}
  const { user: { docId, userId, following, followers, userName, fullName } = {} } = useUser();

    return (
        <p>hello from {fullName}</p>
    )
}