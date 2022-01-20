import UserValidation from "../../propsValidation/UserValidation";

export const User = ({ firstName, lastName, avatar, email, phone, university }) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <img src={avatar} alt={"(-_-)"}/>
      <p>Name: {fullName}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>University: {university}</p>
    </div>
  );
};

User.propTypes = UserValidation;

User.defaultProps = {
  university: 'N/A'
}