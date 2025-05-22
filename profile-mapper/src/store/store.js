import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/users.slice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
