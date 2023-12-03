import { lazy } from "react";
import Dashboard from "~/features/dashboard/dashboard";
import Login from "~/features/login/login";
import NotFound from "~/features/notFound/notFound";
// import ProductTable from "~/features/products/productTable";
import Unauthorized from "~/features/unauthorized/unauthorized";
import CreateUser from "~/features/users/createUser";
import GuestPageLayout from "~/layout/guestPageLayout";
import LoggedInPageLayout from "~/layout/loggedInPageLayout";
// import K from "~/utilities/constants";

const Users = lazy(() => import("~/features/users/users"));
const ProductTable = lazy(() => import("~/features/products/productTable"));

/* 
  * Template for a route
  {
    path: '/login',
    name: "Login",
    component: Login,
    authenticated: false,
    permission: [],
    children: [],
    exact: false,
    layout: LoggedInPageLayout
  }
*/

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: GuestPageLayout,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    authenticated: false,
    // permission: K.Permissions.ReadUser,
    layout: LoggedInPageLayout,
  },
  {
    path: "/users/create",
    name: "Create",
    component: CreateUser,
    authenticated: false,
    // permission: K.Permissions.Admin,
    layout: LoggedInPageLayout,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    authenticated: false,
    layout: LoggedInPageLayout,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    authenticated: false,
    layout: GuestPageLayout,
  },
  {
    path: "/products/product-list",
    name: "ProductTable",
    authenticated: false,
    // permission: K.Permissions.ReadProducts,
    component: ProductTable,
    layout: LoggedInPageLayout,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
    layout: GuestPageLayout,
  },
];

export default routes;
