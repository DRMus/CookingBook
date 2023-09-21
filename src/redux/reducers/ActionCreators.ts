import axios from "../../core/axios";
import { AuthFormValues, IFilters } from "../../interfaces";
import { IIngredient, IRecipe } from "../../interfaces/IRecipe";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";
import { ingredientsSlice } from "./IngredientsSlice";
import { recipesSlice } from "./RecipesSlice";
import Cookies from "js-cookie";
import { selectedRecipeSlice } from "./SelectedRecipeSlice";
import { userSlice } from "./UserSlice";

export const fetchRecipes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(recipesSlice.actions.recipesFetching());
    const response = await axios.get<IRecipe[]>("/recipes");
    dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(recipesSlice.actions.recipesFetchingError(e.message));
  }
};

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(ingredientsSlice.actions.ingredientsFetching());
    const response = await axios.get<IIngredient[]>("/ingredients");
    dispatch(ingredientsSlice.actions.ingredientsFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(ingredientsSlice.actions.ingredientsFetchingError(e.message));
  }
};

export const registrateUser = (data: AuthFormValues) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authPending());

    const response = await axios.post<{ token: string }>("/auth/registration", data);

    const { token } = response.data;
    Cookies.set("token", token, { expires: new Date().setHours(5) });
    dispatch(authSlice.actions.authSuccess(token));
  } catch (e: any) {
    dispatch(authSlice.actions.authFailed(e.response.data.message));
  }
};

export const loginUser = (data: AuthFormValues) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authPending());

    const response = await axios.post<{ token: string }>("/auth/login", data);

    const { token } = response.data;
    Cookies.set("token", token, { expires: new Date().setHours(5) });
    dispatch(authSlice.actions.authSuccess(token));
  } catch (e: any) {
    dispatch(authSlice.actions.authFailed(e.response.data.message));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  Cookies.remove("token");
  dispatch(authSlice.actions.authNotAuthorizated());
};

export const verifyUser = () => async (dispatch: AppDispatch) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      dispatch(authSlice.actions.authNotAuthorizated());
      return;
    }
    dispatch(authSlice.actions.authSuccess(token));
    await axios.get<boolean>("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e: any) {
    Cookies.remove("token");
    dispatch(authSlice.actions.authNotAuthorizated());
  }
};

export const fetchOneRecipe = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(selectedRecipeSlice.actions.recipeFetching());
    const response = await axios.get<IRecipe>(`/recipes/${id}`);
    dispatch(selectedRecipeSlice.actions.recipeFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(selectedRecipeSlice.actions.recipeFetchingFailed(e.message));
  }
};

export const fetchUserLikes =
  (id: number, token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.userLikesPending());
      const response = await axios.get<{ likes: string }>(`/users/like/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const likes = response.data.likes.split(",");
      dispatch(userSlice.actions.userLikesFetchSuccess(likes));
    } catch (e: any) {
      dispatch(userSlice.actions.userLikesFetchFailed(e.message));
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
