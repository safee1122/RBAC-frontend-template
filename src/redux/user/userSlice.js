import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { saveUserData } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;

export default userSlice.reducer;
