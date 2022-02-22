import { useMutation, useQueries } from "react-query";
import { getUser } from "../../users/api/crud";
import { getUniversities, putUpdateProfile } from "../api/crud";
import { Profile } from "../../../components/profile";
import { Loading } from "../../../components/loading";
import * as React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { UpdateProfile } from "../../../components/profile/updateProfile";

export const MyDataContainer = ({ userId, accessLevels }) => {
  const [userData, setUserData] = useState(undefined);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);

  const [user, universities] = useQueries([{
      queryKey: `user${userId}`, queryFn: () => getUser(userId)
    },
    {
      queryKey: 'universities', queryFn: () => getUniversities()
    }]);

  const { mutate } = useMutation(`user${userId}`, (data) => putUpdateProfile(data));

  const updateProfile = (values, { setSubmitting }) => {
    const profileData = {
      UserID: userId,
      FirstName: values.FirstName,
      LastName: values.LastName,
      Phone: values.Phone,
      UniversityID: values.UniversityID
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

  if (user.isFetched && !userData) {
    setUserData(user.data.data);
  }

  return (
    <>
      {user.isFetching && <Loading/>}
      {userData && universities.isFetched && <Profile user={userData}
                                                            universities={universities?.data?.data}
                                                            handleOpenEditProfile={handleOpenEditProfile} />}
      {openProfileEdit && <UpdateProfile user={userData}
                                         universities={universities?.data?.data}
                                         updateProfile={updateProfile}
                                         accessLevels={accessLevels}
                                         open={openProfileEdit}
                                         handleClose={handleCloseEditProfile} />}
    </>
  );
};

MyDataContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  accessLevels: PropTypes.array.isRequired
};
