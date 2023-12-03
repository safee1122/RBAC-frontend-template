import { message } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import NetworkCall from "~/network/networkCall";
import Request from "~/network/request";
import {
  addUser,
  removeUser,
  saveUserData,
  saveUsers,
} from "~/redux/user/userSlice";
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

    return async (dispatch) => {
      const response = await NetworkCall.fetch(request, true);
      dispatch(saveUsers(response?.userData));
      return response;
    };
  }

  static async deleteUser(id) {
    const params = K.Network.URL.Users.DeleteUser + id;
    const request = new Request(
      params,
      K.Network.Method.DELETE,
      null,
      null,
      K.Network.Header.Type.Json,
      false,
    );

    return async (dispatch) => {
      const response = await NetworkCall.fetch(request, true);
      console.log({ response });
      dispatch(removeUser(response?.user));
      return response;
    };
  }
  // Invite User
  static async create(body) {
    console.log({ body });
    const request = new Request(
      K.Network.URL.Users.Create,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false,
    );

    return async (dispatch) => {
      const response = await NetworkCall.fetch(request, true);
      console.log({ response });
      dispatch(addUser(response?.data));
      return response;
    };
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
    const { firstname, lastname } = this.getUserObjectFromCookies().user;
    return firstname?.concat(" ", lastname) ?? "";
  }

  static getEmail() {
    return this.getUserObjectFromCookies().email ?? "";
  }

  static getRole() {
    return this.getUserObjectFromCookies()?.user?.userRole?.name ?? null;
  }
  static getTenant() {
    return this.getUserObjectFromCookies().tenant?.domainPrefix ?? "";
  }
}
