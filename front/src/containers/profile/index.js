import { Profile } from "../../components/profile";
import { useMutation, useQueries } from "react-query";
import { getUniversities, putUpdateProfile } from "./api/crud";
import { getUser } from "../users/api/crud";
import { Loading } from "../../components/loading";

export const ProfileContainer = () => {
  //To get User Id during auth
  const userId = 1;

  const [user, universities] = useQueries([{
    queryKey: `user${userId}`, queryFn: () => getUser(userId)
  },
  {
    queryKey: 'universities', queryFn: () => getUniversities()
  }]);

  const { mutate } = useMutation(`user${userId}`, (data) => putUpdateProfile(data));

  const updateProfile = (values, { setSubmitting }) => {
    mutate({ userId, ...values });
    setSubmitting(false);
    alert('Profile Updated Successfully!');
  }

  return (
    <>
      {user.isFetching && <Loading/>}
      {user.isFetched && universities.isFetched &&
      <Profile
        user={user?.data?.data}
        universities={universities?.data?.data}
        updateProfile={updateProfile}
      />}
    </>
  );
};
