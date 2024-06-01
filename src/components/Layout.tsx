import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const Layout: FC = () => {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <div className="bg-gray-200 gap-4 text-black flex items-center p-4">
        <Link to={ROUTES.GLOBAL_STATE}>Global State</Link>
        <Link to={ROUTES.PLANETS}>Planets</Link>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
