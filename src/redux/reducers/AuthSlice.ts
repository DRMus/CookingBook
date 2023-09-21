import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDecodedUser } from "../../interfaces/IUser";
import jwtDecode from "jwt-decode";

interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  decodedToken: IDecodedUser | undefined;
  token: string;
  error: string;
}

const initialState: AuthState = {
  isAuthorized: false,
  isLoading: false,
  decodedToken: undefined,
  token: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authPending(state) {
      state.isLoading = true;
    },
    authSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthorized = true;
      state.decodedToken = jwtDecode(action.payload);
      state.token = action.payload;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthorized = false;
      state.decodedToken = undefined;
      state.token = "";
      state.error = action.payload;
    },
    authNotAuthorizated(state) {
      state.isLoading = false;
      state.isAuthorized = false;
      state.decodedToken = undefined;
      state.token = "";
      state.error = "";
    },
  },
});

export default authSlice.reducer;
