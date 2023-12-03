import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  allUsers: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDetails = action.payload;
    },
    saveUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    removeUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload._id,
      );
    },
  },
});

export const { saveUserData, saveUsers, addUser, removeUser } =
  userSlice.actions;

export const selectUser = (state) => state.user.userDetails;
export const allUsers = (state) => state.user.allUsers;

export default userSlice.reducer;
