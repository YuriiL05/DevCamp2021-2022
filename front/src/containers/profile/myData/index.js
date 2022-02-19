import { useMutation, useQueries } from "react-query";
import { getUser } from "../../users/api/crud";
import { getUniversities, putUpdateProfile } from "../api/crud";
import { Profile } from "../../../components/profile";
import { Loading } from "../../../components/loading";
import * as React from "react";
import PropTypes from "prop-types";

export const MyDataContainer = ({ userId, accessLevels }) => {
  const [user, universities] = useQueries([{
    queryKey: `user${userId}`, queryFn: () => getUser(userId)
  },
    {
      queryKey: 'universities', queryFn: () => getUniversities()
    }]);

  const { mutate } = useMutation(`user${userId}`, (data) => putUpdateProfile(data));

  const updateProfile = (values, { setSubmitting }) => {
    console.log(values);
    const profileData = {
      UserID: userId,
      FirstName: values.FirstName,
      LastName: values.LastName,
      Phone: values.Phone,
      UniversityID: values.UniversityID,
      avatar: values?.avatar
    }

    mutate(profileData);
    setSubmitting(false);
    alert('Update started!');
  }

  return (
    <>
      {user.isFetching && <Loading/>}
      {user.isFetched && universities.isFetched && <Profile
        user={user?.data?.data}
        universities={universities?.data?.data}
        updateProfile={updateProfile}
        accessLevels={accessLevels}
      />}
    </>
  );
};

MyDataContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  accessLevels: PropTypes.array.isRequired
};