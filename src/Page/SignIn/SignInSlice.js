import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
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
      localStorage.setItem("token", "");
    },
  },
});
export const { isLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
