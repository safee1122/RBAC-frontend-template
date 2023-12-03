import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "~/redux/user/userSlice";
import productsSlice from "~/redux/product/productsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
  },

  // everytime when we dispatch an action, this line will console
  // the previous state, action with payload and updated state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
