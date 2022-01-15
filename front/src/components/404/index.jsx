import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  );
};