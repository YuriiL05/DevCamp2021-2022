import { useMutation, useQuery } from "react-query";
import { getUser } from "../../users/api/crud";
import { getUniversities, putUpdateProfile } from "../api/crud";
import { Profile } from "../../../components/profile";
import { Loading } from "../../../components/loading";
import * as React from "react";
import { useContext, useState } from "react";
import { UpdateProfile } from "../../../components/profile/updateProfile";
import userContext from "../../../contexts/userContext";

export const MyDataContainer = () => {
  const [userData, setUserData] = useState(undefined);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const { id: UserID } = useContext(userContext).user;

  const { data: universities, isFetched: universitiesIsFetched } = useQuery(
    `universities`,
    () => getUniversities(),
    {
      retry: false
    }
  );

  const { isFetching: userIsFetching, data: userFromDB } = useQuery(
    `user${UserID}`,
    () => getUser(UserID),
    {
      retry: false
    }
  );

  const { mutate } = useMutation(`user${UserID}`, (data) => putUpdateProfile(data));

  const updateProfile = (values, { setSubmitting }) => {
    const profileData = {
      UserID,
      FirstName: values.FirstName,
      LastName: values.LastName,
      Phone: values.Phone,
      UniversityID: +values.UniversityID,
      Email: userData?.Email
    }

    mutate(profileData);
    setSubmitting(false);
    handleCloseEditProfile();
    setUserData({...userData, ...profileData});
  }

  const handleOpenEditProfile = () => {
    setOpenProfileEdit(true);
  };

  const handleCloseEditProfile = () => {
    setOpenProfileEdit(false);
  };

  if (!userIsFetching && !userData) {
    setUserData(userFromDB.data);
  }

  return (
    <>
      {userIsFetching && <Loading/>}
      {userData && universitiesIsFetched && <Profile user={userData}
                                                     universities={universities?.data}
                                                     handleOpenEditProfile={handleOpenEditProfile} />}
      {openProfileEdit && <UpdateProfile user={userData}
                                         universities={universities?.data}
                                         updateProfile={updateProfile}
                                         open={openProfileEdit}
                                         handleClose={handleCloseEditProfile} />}
    </>
  );
};
