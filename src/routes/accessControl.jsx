import { Navigate, Outlet } from "react-router-dom";
import User from "~/models/user";
import { isPermissionPresent } from "~/utilities/generalUtility";

export default function AccessControl({
  routePath,
  routePermission,
  isAuthenticatedRoute,
}) {
  console.log;
  if (
    !isAuthenticatedRoute ||
    (isAuthenticatedRoute && User.isTokenAvailable())
  ) {
    // * Check domain prefix

    if (["/login"].includes(routePath) && User.isTokenAvailable())
      return <Navigate to="/" replace />;
    // Check permission
    console.log(routePermission, User.getRole());
    const hasPermission = isPermissionPresent(routePermission, User.getRole());
    console.log({ hasPermission });
    if (hasPermission) {
      return <Outlet />;
    } else {
      console.log("false", { hasPermission });
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
}
