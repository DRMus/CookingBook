import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./reducers/RecipesSlice";
import ingredientsReducer from "./reducers/IngredientsSlice";
import authReducer from "./reducers/AuthSlice";
import selectedRecipeReducer from "./reducers/SelectedRecipeSlice";

const rootReducer = combineReducers({
  recipesReducer,
  ingredientsReducer,
  authReducer,
  selectedRecipeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
