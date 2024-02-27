import { createReducer, on } from "@ngrx/store";
import { fetchUserInfor } from "./user.actions";

export const initialState = {
  user: {},
};

export const userReducer = createReducer(
  initialState,
  on(fetchUserInfor, (state, { user }) => ({ ...state, user }))
);