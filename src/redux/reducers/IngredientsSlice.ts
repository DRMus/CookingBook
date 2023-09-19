import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../interfaces/IRecipe";

interface IngredientsState {
  isLoading: boolean;
  ingredientsList: IIngredient[];
  error: string;
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredientsList: [],
  error: "",
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    ingredientsFetching(state) {
      state.isLoading = true;
    },
    ingredientsFetchingSuccess(state, action: PayloadAction<IIngredient[]>) {
      state.isLoading = false;
      state.error = "";
      state.ingredientsList = action.payload;
    },
    ingredientsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ingredientsSlice.reducer
