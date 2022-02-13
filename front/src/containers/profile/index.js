import { useOutletContext } from "react-router-dom";
import { MyDataContainer } from "./myData";
import { FriendsContainer } from "./friends";

export const ProfileContainer = () => {
  const accessLevels = useOutletContext();
  //To get User Id during auth
  const userId = 1;


  return (
    <>
      <MyDataContainer userId={userId} accessLevels={accessLevels} />
      <FriendsContainer userId={userId} />
    </>
  );
};
