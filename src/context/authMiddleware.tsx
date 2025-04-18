import { Navigate, Outlet, useLocation } from "react-router";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const restrictedPaths = ["/auth/login", "/auth/register"];
const privateProtected = ["/profile/mentor", "/profile/mentee"];

export const AuthMiddleware = () => {
  const isAuthenticated = !!cookies.get("MENTORING_USER_TOKEN");
  const location = useLocation();

  const isRestrictedPath = restrictedPaths.includes(location.pathname);

  if (isAuthenticated && isRestrictedPath) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && privateProtected.includes(location.pathname)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
