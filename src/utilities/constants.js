const K = {
  Network: {
    URL: {
      Base: import.meta.env.VITE_BASE_URL,
      BaseAPI: import.meta.env.VITE_BASE_API_URL,
      DomainName: import.meta.env.VITE_CLIENT_DOMAIN_NAME,
      Timeout: import.meta.env.VITE_TIMEOUT,
      Protocol: import.meta.env.VITE_CLIENT_PROTOCOL,
      IsMultiTenant: import.meta.env.VITE_IS_MULTI_TENANT === "false", // * Converting into boolean
      TenantURL: (domainPrefix = "") => {
        return (
          import.meta.env.VITE_CLIENT_PROTOCOL +
          "://" +
          domainPrefix +
          import.meta.env.VITE_TENANT_PARTIAL_URL
        );
      },
      Client: {
        BaseHost: import.meta.env.VITE_CLIENT_BASE_HOST,
        BasePort: import.meta.env.VITE_CLIENT_BASE_PORT,
      },

      Auth: {
        Login: "/admin/auth/login",
      },
      Users: {
        GetUser: "/user",
        LoggedInUserDetails: "/user/me",
        UpdateProfileData: "/user/update-profile",
        DeleteUser: "/user/delete-user",
        InviteUser: "/user/invite-user",
        UploadProfilePicture: "user/upload-picture",
        DeleteProfilePicture: "user/profile-picture",
      },

      Products: {
        GetAll: "/admin/product",
        GetProducts: "/product/get",
        GetProductsById: "/product",
        CreateProducts: "/admin/product/create",
        UpdateProducts: "/admin/product/update",
        DeleteProducts: "/admin/product",
      },

      Roles: "/roles",
      Permission: "/permissions",
    },
    Method: {
      GET: "GET",
      PUT: "PUT",
      POST: "POST",
      PATCH: "PATCH",
      DELETE: "DELETE",
    },
    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: (token = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }),
      Authorization: (token = "") => ({
        Authorization: "Bearer " + token,
      }),
      Type: {
        Json: "json",
        File: "file",
      },
    },
    ResponseType: { Blob: "blob", Json: "json" },
    StatusCode: {
      NotModified: 304,
      Unauthorized: 401,
      Forbidden: 403,
      NotFound: 404,
      InternalServerError: 500,
    },
  },
  Cookie: {
    Key: {
      User: "user",
      EncryptionKey: "logged_in_user",
    },
  },
  Permissions: {
    admin: "admin",
    "super-admin": "super-admin",
    user: "user",
  },
};
export default K;
