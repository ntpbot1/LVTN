import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    id: "",
    userName: "",
    email: "",
    avatar: "",
    isLogin: false,
  },
  reducers: {
    isLogin: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;

      state.isLogin = true;
    },
    logout: (state) => {
      state.userName = "";
      state.isLogin = false;
      sessionStorage.setItem("token", "");
      window.location.replace("http://localhost:3000/");
    },
  },
});
export const { isLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
