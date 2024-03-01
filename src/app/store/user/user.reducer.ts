import { createReducer, on } from "@ngrx/store";
import { fetchUserInfor } from "./user.actions";

export const initialState = {
  userInfo: {},
};

export const userReducer = createReducer(
  initialState,
  on(fetchUserInfor, (state, { userInfo }) => ({ ...state, userInfo }))
);