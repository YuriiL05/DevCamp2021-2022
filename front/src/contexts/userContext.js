import { createContext } from 'react';

const userContext = createContext(
  {
    authenticated: false,
    user: { UserID: 1, FirstName: "Test", LastName: "Test", Email: "some@mail.com" }
  }
);

export default userContext;
