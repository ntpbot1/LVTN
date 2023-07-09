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
    listNews: [],
    slug: "",
    isLogin: false,
  },
  reducers: {
    isLogin: (state, action) => {
      state.id = action.payload.id;
      state.img = action.payload.img;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
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
    isSave: (state, action) => {
      state.listNews = action.payload.listNews;
    },
    isGetDeTail: (state, action) => {
      state.slug = action.payload.slug;
    },
  },
});
export const { isLogin, logout, isSave, isGetDeTail } = loginSlice.actions;
export default loginSlice.reducer;
