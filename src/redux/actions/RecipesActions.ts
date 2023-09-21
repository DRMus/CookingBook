import axios from "../../core/axios";
import { IFilters } from "../../interfaces";
import { IRecipe } from "../../interfaces/IRecipe";
import { recipesSlice } from "../reducers/RecipesSlice";
import { AppDispatch } from "../store";

export const fetchRecipes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(recipesSlice.actions.recipesFetching());
    const response = await axios.get<IRecipe[]>("/recipes");
    dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(recipesSlice.actions.recipesFetchingError(e.message));
  }
};

export const fetchRecipesWithFilters =
  (filtersDto: IFilters) => async (dispatch: AppDispatch) => {
    try {

      dispatch(recipesSlice.actions.recipesFetching());
      const response = await axios.post<IRecipe[]>("recipes/filter", filtersDto);
      dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(recipesSlice.actions.recipesFetchingError(e.message))
    }
  };