import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRecipe } from "../../interfaces/IRecipe";

interface RecipeState {
  isLoading: boolean;
  recipe: IRecipe | undefined;
  error: string;
}

const initialState: RecipeState = {
  isLoading: false,
  recipe: undefined,
  error: ""
}

export const selectedRecipeSlice = createSlice({
  name: "selectedRecipe",
  initialState,
  reducers: {
    recipeFetching(state) {
      state.isLoading = true;
      state.recipe = undefined;
      state.error = "";
    },
    recipeFetchingSuccess(state, action: PayloadAction<IRecipe>) {
      state.isLoading = false;
      state.recipe = action.payload;
      state.error = "";
    },
    recipeFetchingFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.recipe = undefined;
      state.error = action.payload;
    },
    recipeInit(state) {
      state.isLoading = false;
      state.recipe = undefined;
      state.error = "";
    }
  }
})

export default selectedRecipeSlice.reducer