import { Outlet } from "react-router-dom";

export const Articles = () => {
  return (
    <div>
      Articles:
      <hr/>
      <Outlet/>
    </div>
  );
};
