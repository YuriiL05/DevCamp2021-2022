export const Profile = ({ userName, avatar }) => {
  return (
    <div className={"profile"}>
      <p>UserName: {userName}</p>
      <p>avatar:</p>
      <img src={avatar} alt={"Not uploaded"}/>
    </div>
  );
};
