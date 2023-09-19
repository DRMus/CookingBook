import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthorized: boolean,
  isLoading: boolean,
  token: string,
  error: string,
}

const initialState: AuthState = {
  isAuthorized: false,
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
      state.isAuthorized = true;
      state.token = action.payload;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthorized = false;
      state.token = "";
      state.error = action.payload;
    },
    authNotAuthorizated(state) {
      state.isLoading = false;
      state.isAuthorized = false;
      state.token = "";
      state.error = "";
    }
  }
})

export default authSlice.reducer