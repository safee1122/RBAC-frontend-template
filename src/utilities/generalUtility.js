import { message } from "antd";
import K from "./constants";
import history from "./history";
import User from "~/models/user";

export const handleError = (error) => {
  message.error(error.message);
  return null;
};

export const toCamelCaseToSentence = (string) => {
  return string.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
};

export const snakeCaseToSentence = (string) => {
  return string
    ?.split("_")
    ?.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    ?.join(" ");
};

export const hasOnlyDigits = (string) => {
  return /^-{0,1}\d+$/.test(string);
};

export const getColor = (value) => {
  //value from 0 to 1
  const hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",65%,70%)"].join("");
};

export const isNumberRegex = () => {
  return new RegExp("^[0-9]*$");
};

export const isDecimalRegex = () => {
  return new RegExp("^\\d+\\.?\\d*$");
};

export const isPermissionPresent = (permission, permissionHash) => {
  // const hash = new Map(permissionHash);
  // * Uncomment above code if permissionHash not stored as instance of Map.
  if (permission.length > 0) {
    return permission?.includes(permissionHash);
  }
  return true;
};

export const redirectIfInvalidTenant = () => {
  const cookieDomainPrefix = User.getTenant();
  const hostArray = window.location.hostname.split(".");
  const urlDomainPrefix = hostArray.length > 0 ? hostArray[0] : "";
  const path = window.location.pathname;
  const search = window.location.search;
  if (
    !cookieDomainPrefix &&
    (urlDomainPrefix === "www" ||
      urlDomainPrefix === "localhost" ||
      urlDomainPrefix === K.Network.URL.DomainName)
  )
    return false;
  if (cookieDomainPrefix !== urlDomainPrefix) {
    redirectToUrl(path + search, cookieDomainPrefix);
  }
};

export const redirectToLogin = (error = "") => {
  if (typeof window !== "undefined") {
    let newUrl =
      window.location.protocol +
      "//" +
      K.Network.URL.Client.BaseHost +
      ":" +
      K.Network.URL.Client.BasePort +
      "/login";
    if (error !== "") {
      newUrl += `?err=${error}`;
    }
    window.location = newUrl;
  }
};

export const redirectToUrl = (path, domainPrefix = "") => {
  window.location =
    window.location.protocol +
    "//" +
    (domainPrefix ? domainPrefix + "." : "") +
    K.Network.URL.Client.BaseHost +
    ":" +
    K.Network.URL.Client.BasePort +
    path;
};

export const setFieldErrorsFromServer = (error, form, values = undefined) => {
  if (error.error === undefined) return;
  const errors = error.error.data.errors;
  if (typeof errors === "string" || errors instanceof String) {
    return;
  }
  let fieldErrors = [];
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      // let fieldError = errors[key].map((error) => {
      //     return error;
      // });
      fieldErrors.push({
        name: key,
        errors: errors[key],
        value: values && values[key] ? values[key] : undefined,
      });
    }
  }
  form.setFields(fieldErrors);
};

export const snakeToCamel = (str) => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );
};

export const camelCaseKeys = (obj) =>
  Object.keys(obj).reduce(
    (ccObj, field) => ({
      ...ccObj,
      [snakeToCamel(field)]: obj[field],
    }),
    {},
  );

export const camelCaseKeysRecursively = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelCaseKeysRecursively(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeToCamel(key)]: camelCaseKeysRecursively(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const deleteQueryParam = (key) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(key);
  history.push({
    search: queryParams.toString(),
  });
};

export const stringSorting = (a, b, name) => {
  return a[name]?.localeCompare(b[name]);
};

export const numberSorting = (a, b, name) => {
  return a[name] - b[name];
};

export const downloadCSV = (csvContent, filename = "export.csv") => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
