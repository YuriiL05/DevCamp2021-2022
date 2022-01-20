import { UserForList } from "../../../components/userForList";

export const UserForListContainer = ({ user }) => {
  const { UserID, FirstName, LastName, Avatar } = user;
  const FullName = `${FirstName} ${LastName}`;

  return (
    <>
      <UserForList userId={UserID} fullName={FullName} avatar={Avatar}/>
    </>
  );
};
