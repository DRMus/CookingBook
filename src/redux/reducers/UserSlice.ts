import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  likes: string[];
  error: string;
}

const initialState: AuthState = {
  isLoading: false,
  likes: [],
  error: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLikesPending(state) {
      state.isLoading = true;
    },
    userLikesFetchSuccess(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.likes = action.payload;
    },
    userLikesFetchFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export default userSlice.reducer;