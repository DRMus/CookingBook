import axios from "../../core/axios";
import { IIngredient } from "../../interfaces/IRecipe";
import { ingredientsSlice } from "../reducers/IngredientsSlice";
import { AppDispatch } from "../store";

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(ingredientsSlice.actions.ingredientsFetching());
    const response = await axios.get<IIngredient[]>("/ingredients");
    dispatch(ingredientsSlice.actions.ingredientsFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(ingredientsSlice.actions.ingredientsFetchingError(e.message));
  }
};
