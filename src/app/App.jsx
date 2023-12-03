import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "~/common/spinner/spinner";
import ThemeProvider from "~/theme/themeProvider";
import User from "~/models/user";
import RouterProvider from "~/routes/routerProvider";
import { saveUserData } from "~/redux/user/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    console.log("App function>>>>>>>>>>", User.isTokenAvailable());
    if (
      User.isTokenAvailable() &&
      !(window.location !== window.parent.location)
    ) {
      const { user } = User.getUserObjectFromCookies();
      console.log({ user });
      dispatch(saveUserData(user));
    }
    setShouldLoad(true);
  }, []);

  if (!shouldLoad) return <Spinner />;

  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
}
