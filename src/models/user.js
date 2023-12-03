import { message } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import NetworkCall from "~/network/networkCall";
import Request from "~/network/request";
import { saveUserData } from "~/redux/user/userSlice";
import K from "~/utilities/constants";
import { redirectToLogin } from "~/utilities/generalUtility";

export default class User {
  // API call using thunk.
  static loginCall(email, password, remember) {
    const body = {
      email,
      password,
    };
    // * Request Instance
    const request = new Request(
      K.Network.URL.Auth.Login,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return async (dispatch) => {
      const response = await NetworkCall.fetch(request);
      let encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(response),
        K.Cookie.Key.EncryptionKey,
      );

      Cookies.set(K.Cookie.Key.User, encryptedUser, {
        path: "/",
        domain: K.Network.URL.Client.BaseHost,
        expires: remember ? 365 : "",
      });

      // * here we can store loggedIn user date to redux store
      message.success(response?.message);
      dispatch(saveUserData(response?.user));

      return response;
    };
  }

  static logoutCall(error = "") {
    Cookies.remove(K.Cookie.Key.User, {
      path: "/",
      domain: K.Network.URL.Client.BaseHost,
    });
    redirectToLogin(error);
  }

  // get Profile data
  static async profileData() {
    const request = new Request(
      K.Network.URL.Users.LoggedInUserDetails,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return await NetworkCall.fetch(request, true);
  }

  static async getAll() {
    const request = new Request(
      K.Network.URL.Users.GetUser,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return await NetworkCall.fetch(request, true);
  }

  static async deleteUser(id) {
    const request = new Request(
      K.Network.URL.Users.DeleteUser + `?id=${id}`,
      K.Network.Method.DELETE,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return NetworkCall.fetch(request, true);
  }
  //Update Profile Data
  static async updateProfileData(body, remember) {
    const request = new Request(
      K.Network.URL.Users.UpdateProfileData,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    const user = await NetworkCall.fetch(request, true);
    const data = this.getUserObjectFromCookies();
    user.roles = data.user.roles;
    const cookieData = {
      token: data?.token,
      user,
    };
    let encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(cookieData),
      K.Cookie.Key.EncryptionKey,
    );
    Cookies.set(K.Cookie.Key.User, encryptedUser, {
      path: "/",
      domain: K.Network.URL.Client.BaseHost,
      expires: remember ? 365 : "",
    });

    return user;
  }
  // Invite User
  static async inviteUser(email, roleId) {
    const body = {
      email,
      roleId,
    };
    const request = new Request(
      K.Network.URL.Users.InviteUser,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return NetworkCall.fetch(request, true);
  }
  // get all Roles
  static async getUserRoles() {
    const request = new Request(
      K.Network.URL.Roles,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return NetworkCall.fetch(request, true);
  }

  // Upload Profile Picture
  static async uploadProfilePicture(body, remember) {
    const request = new Request(
      K.Network.URL.Users.UploadProfilePicture,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.File,
      {},
      false,
    );
    const result = await NetworkCall.fetch(request, true);
    let data = this.getUserObjectFromCookies();
    data.user.profileImageUrl = result.path;
    const cookieData = {
      token: data?.token,
      user: data.user,
    };
    let encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(cookieData),
      K.Cookie.Key.EncryptionKey,
    );
    Cookies.set(K.Cookie.Key.User, encryptedUser, {
      path: "/",
      domain: K.Network.URL.Client.BaseHost,
      expires: remember ? 365 : "",
    });
    return result;
  }

  //Delete Profile Picture

  static async deleteProfilePicture(remember) {
    const request = new Request(
      K.Network.URL.Users.DeleteProfilePicture,
      K.Network.Method.DELETE,
      K.Network.Header.Type.File,
      {},
      false,
    );

    const result = await NetworkCall.fetch(request, true);
    let data = this.getUserObjectFromCookies();
    data.user.profileImageUrl = result.path;
    const cookieData = {
      token: data?.token,
      user: data.user,
    };
    let encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(cookieData),
      K.Cookie.Key.EncryptionKey,
    );
    Cookies.set(K.Cookie.Key.User, encryptedUser, {
      path: "/",
      domain: K.Network.URL.Client.BaseHost,
      expires: remember ? 365 : "",
    });
    return result;
  }

  // * Helpers

  static getUserObjectFromCookies() {
    let cookieUser = Cookies.get(K.Cookie.Key.User);
    let bytes = cookieUser
      ? CryptoJS.AES.decrypt(cookieUser, K.Cookie.Key.EncryptionKey)
      : "{}";
    try {
      let utfBytes = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(utfBytes);
    } catch (error) {
      return this.logoutCall("User unauthorized");
    }
  }

  static isTokenAvailable() {
    return this.getUserObjectFromCookies().token ? true : false;
  }

  static getId() {
    return this.getUserObjectFromCookies().user?.id ?? "";
  }

  static getToken() {
    return this.getUserObjectFromCookies().token ?? "";
  }

  static getFullName() {
    const { firstName, lastName } = this.getUserObjectFromCookies().user;
    return firstName?.concat(" ", lastName) ?? "";
  }

  static getEmail() {
    return this.getUserObjectFromCookies().email ?? "";
  }

  static getRole() {
    return this.getUserObjectFromCookies()?.user?.roles ?? null;
  }
  static getTenant() {
    return this.getUserObjectFromCookies().tenant?.domainPrefix ?? "";
  }
}
