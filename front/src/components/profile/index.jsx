import ProfileValidation from "../../propsValidation/ProfileValidation";

export const Profile = ({ userName, avatar }) => {
  return (
    <div className={"profile"}>
      <p>Name: {userName}</p>
      <img src={avatar} alt={"Not uploaded"}/>
    </div>
  );
};

Profile.propTypes = ProfileValidation;