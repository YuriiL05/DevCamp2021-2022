import { Profile } from "../../components/profile";
import { useMutation } from "react-query";
import { postAvatar } from "./api/crud";
import { getUser } from "../users/api/crud";

export const ProfileContainer = () => {
  const userName = "Yurii L"
  const avatar = "/files/1.jpg";
  const userId = 1;

  useMutation(`user${userId}`, (avatarPath) => postAvatar(userId, avatarPath));

  const avatarForUser = (avatarPath) => {

  }

  return (
    <>
      <Profile userName={userName} avatar={avatar} userId={userId} avatarPath={avatar}/>
    </>
  );
};
