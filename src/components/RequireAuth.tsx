import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAppSelector } from "../hooks/useStore";
import { Role, Roles } from "../interfaces/Role";
// import useRefreshToken from "../hooks/useRefreshToken";

interface AccessTokenPayload {
  info: {
    userName: string;
    id: number;
  };
  roles: number[];
  username: string;
  iat: number;
  exp: number;
}
interface Props {
  allowedRoles: Roles;
}
const RequireAuth = ({ allowedRoles }: Props) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();

  const decoded: AccessTokenPayload | undefined = accessToken
    ? jwt_decode(accessToken)
    : undefined;

  const roles = decoded?.roles || [];

  return roles.map((role: Role) => allowedRoles.includes(role)).find((value) => value == true) ? (
    <Outlet />
  ) : auth.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
