import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../interfaces/IRecipe";

interface RecipesState {
  isLoading: boolean;
  recipesList: IRecipe[];
  error: string;
}

const initialState: RecipesState = {
  isLoading: false,
  recipesList: [],
  error: "",
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    recipesFetching(state) {
      state.isLoading = true;
    },
    recipesFetchingSuccess(state, action: PayloadAction<IRecipe[]>) {
      state.isLoading = false;
      state.error = "";
      state.recipesList = action.payload;
    },
    recipesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default recipesSlice.reducer
