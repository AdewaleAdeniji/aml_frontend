/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const getUser = () =>
  localStorage.getItem("user_profile_meta")
    ? JSON.parse(localStorage.getItem("user_profile_meta"))
    : null;
export const getToken = () =>
  localStorage.getItem("authT") ? localStorage.getItem("authT") || null : null;
export const getApps = () => {
  return localStorage.getItem("client_apps") ? JSON.parse(localStorage.getItem("client_apps")) || {} : {};
}
export const getClientID = () => {
  return localStorage.getItem('current_app_client_id') ? localStorage.getItem('current_app_client_id') || '' : '';
}
export const getStats = () => {
  return localStorage.getItem('dashboard_stats') ? JSON.parse(localStorage.getItem('dashboard_stats')) || {} : {};
}
const initialState = {
  email: "",
  loggedin: getToken() !== null,
  token: getToken(),
  password: "",
  user: getUser(),
  apps:getApps(),
  clientId: getClientID(),
  stats:getStats()
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    saveStats: (state, action) => {
      state.stats = action.payload;
      localStorage.setItem('dashboard_stats',JSON.stringify(action.payload))
      console.log(action.payload)
    },
    saveUser: (state, action) => {
      state.user = JSON.parse(action.payload);
      state.loggedin = true;
      state.token = JSON.parse(action.payload).token;
      localStorage.setItem("authT", JSON.parse(action.payload).token);
      localStorage.setItem("user_profile_meta", action.payload);
    },
    saveToken: (state, action) => {
      state.loggedin =  true;
      state.token = action.payload;
      localStorage.setItem("authT", action.payload);
    },
    logoutUser: (state) => {
      userSlice.caseReducers.reset();
      state.token = "";
      state.loggedin = false;
      localStorage.removeItem('authT');
      localStorage.removeItem("user_profile_meta");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, saveToken, logoutUser, saveUser, saveStats } = userSlice.actions;

export default userSlice.reducer;
