import { createContext } from 'react';

const userContext = createContext(
  {
    authenticated: false,
    user: {},
    setUserData: () => {}
  }
);

export default userContext;
