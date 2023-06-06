import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Page/SignIn/SignInSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
export default store;
