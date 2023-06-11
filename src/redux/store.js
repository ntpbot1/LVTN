import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Page/SignIn/SignInSlice";
import loginAdminReducer from "../Admin/SignIn/SignInSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    loginAdmin: loginAdminReducer,
  },
});
export default store;
