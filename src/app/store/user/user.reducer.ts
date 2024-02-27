import { createReducer, on } from "@ngrx/store";
import { login, loginSuccess } from "./user.actions";

export const initialState = {
  user: {},
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state) => ({ ...state, isLoggedIn: true })),
);