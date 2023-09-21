import axios from "../../core/axios";
import { IRecipe } from "../../interfaces/IRecipe";
import { selectedRecipeSlice } from "../reducers/SelectedRecipeSlice";
import { AppDispatch } from "../store";

export const fetchOneRecipe = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(selectedRecipeSlice.actions.recipeFetching());
    const response = await axios.get<IRecipe>(`/recipes/${id}`);
    dispatch(selectedRecipeSlice.actions.recipeFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(selectedRecipeSlice.actions.recipeFetchingFailed(e.message));
  }
};