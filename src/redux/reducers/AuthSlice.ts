import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthorizated: boolean,
  isLoading: boolean,
  token: string,
  error: string,
}

const initialState: AuthState = {
  isAuthorizated: false,
  isLoading: false,
  token: "",
  error: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authPending(state) {
      state.isLoading = true;
    },
    authSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthorizated = true;
      state.token = action.payload;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthorizated = false;
      state.token = "";
      state.error = action.payload;
    },
    authNotAuthorizated(state) {
      state.isLoading = false;
      state.isAuthorizated = false;
      state.token = "";
    }
  }
})

export default authSlice.reducer