import { createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/AuthPage/SignInPage";
import SignUpPage from "./components/AuthPage/SignUpPage";
import FavoriteRecipes from "./components/FavoriteRecipes/FavoriteRecipes";
import Main from "./components/Main/Main";
import Recipe from "./components/Recipe/Recipe";
import RecipesList from "./components/RecipesList/RecipesList";
import MyRecipes from "./components/MyRecipes/MyRecipes";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <RecipesList />,
        },
        {
          path: "favorites",
          element: <FavoriteRecipes />,
        },
        { path: "recipe", element: <Recipe /> },
        { path: "my", element: <MyRecipes /> },
      ],
    },
    {
      path: "login",
      element: <SignInPage />,
    },
    {
      path: "registration",
      element: <SignUpPage />,
    },
  ],
  {
    basename: "/",
  }
);

export default routes;
