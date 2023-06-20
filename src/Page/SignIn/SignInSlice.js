import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    userName: "",
    email: "",
    isLogin: false,
  },
  reducers: {
    isLogin: (state, action) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.isLogin = true;
    },
    logout: (state) => {
      state.userName = "";
      state.isLogin = false;
      sessionStorage.setItem("token", "");
    },
  },
});
export const { isLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
