import { Link } from "react-router-dom";

export const Users = ({ users }) => {
  return (
    <>
      <Link to={`/users/1`} className={"articleList"}>
        <li>1</li>
      </Link>
    </>
  );
};
