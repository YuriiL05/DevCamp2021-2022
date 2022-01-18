import { Profile } from "../../components/profile";


export const ProfileContainer = () => {
  const userName = "Yurii L"
  const avatar = "/files/1.jpg";

  return (
    <>
      <Profile userName={userName} avatar={avatar}/>
    </>
  );
};
