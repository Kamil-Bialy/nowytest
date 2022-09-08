import { createContext, useEffect, useState } from 'react';
import { getUser } from '../api/database';

export const UserContext = createContext({
  userId: sessionStorage.getItem('id'),
  loggedIn: false,
  addUserId: id => {},
  removeUserId: () => {},
});

function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(sessionStorage.getItem('id'));

  useEffect(() => {
    async function init() {
      setUserId(sessionStorage.getItem('id'));
      const user = await getUser(userId);
      if (!user) {
        removeUserId();
      }
    }

    init();
  }, [userId]);

  function addUserId(id) {
    sessionStorage.setItem('id', id);
    setUserId(id);
  }

  function removeUserId() {
    sessionStorage.removeItem('id');
    setUserId(null);
  }

  const value = {
    userId: userId,
    addUserId: addUserId,
    removeUserId: removeUserId,
    loggedIn: !!userId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
