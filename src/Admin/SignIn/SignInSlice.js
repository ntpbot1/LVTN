import { createSlice } from "@reduxjs/toolkit";
const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState: {
    userName: "",
    isLogin: false,
  },
  reducers: {
    isLogin: (state, action) => {
      state.userName = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.userName = "";
      state.isLogin = false;
      sessionStorage.setItem("tokenAdmin", "");
    },
  },
});
export const { isLogin, logout } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;
