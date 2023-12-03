import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import K from "~/utilities/constants";
// import K from "~/utilities/constants";

// Template a navigation item
// {
//     name: 'User',
//     path: '/user/list',
//     icon: <ProjectOutlined />,
//     permission: [],
//     children: [], // If item has children, then the path field will be ignored.
// }

const defaultChildren = (basePath) => [
  { path: `${basePath}`, name: "List" },
  // {
  //   path: `${basePath}/create`,
  //   name: "Create",
  //   roles: [K.Permissions.Admin],
  // },
];

const productChildren = (basePath) => [
  { path: `${basePath}/product-list`, name: "List" },
];

const navigations = [
  {
    name: "Dashboard",
    path: "/",
    permission: [
      K.Permissions.user,
      K.Permissions.admin,
      K.Permissions["super-admin"],
    ],
    icon: <DashboardOutlined />,
  },
  {
    name: "Products",
    // path: "/products",
    icon: <ProjectOutlined />,
    permission: [K.Permissions.admin, K.Permissions["super-admin"]],
    children: productChildren("/products"),
  },
  {
    name: "Users",
    // path: "/users",
    icon: <UserOutlined />,
    permission: [K.Permissions.admin, K.Permissions["super-admin"]],
    children: defaultChildren("/users"),
  },
];

export default navigations;
