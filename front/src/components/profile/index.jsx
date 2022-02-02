import ProfileValidation from "../../propsValidation/ProfileValidation";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { postAvatar } from "../../containers/profile/api/crud";

export const Profile = ({ userName, avatar, userId }) => {


  const onSubmitTest = (data) => {
    mutate(data);
  };

  const { mutate } = useMutation( (avatarPath) => postAvatar(userId, avatarPath));

  return (
    <div className={"profile"}>
      <p>Name: {userName}</p>
      <img src={avatar} alt={"Not uploaded"}/>
      <Formik
        onSubmit={onSubmitTest}
        initialValues={{
          avatar: undefined
        }}
      >
        <Form>
          <div>
            <Field type={"file"} className={"form-control-file"} name={"avatar"}/>
            <button type={"submit"}>Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

Profile.propTypes = ProfileValidation;