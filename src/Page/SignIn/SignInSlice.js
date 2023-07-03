import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    id: "",
    img: "",
    userName: "",
    email: "",
    phone: "",
    birth: "",
    address: "",
    isLogin: false,
  },
  reducers: {
    isLogin: (state, action) => {
      state.id = action.payload.id;
      state.img = action.payload.img;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar;
      state.birth = action.payload.birth;
      state.address = action.payload.address;
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
