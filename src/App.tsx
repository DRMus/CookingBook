import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import RecipesList from "./components/RecipesList/RecipesList";
import FavoriteRecipes from "./components/FavoriteRecipes/FavoriteRecipes";
import Recipe from "./components/Recipe/Recipe";
import SignInPage from "./components/AuthPage/SignInPage";

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
          path: "favorite",
          element: <FavoriteRecipes />,
        },
        { path: "recipe", element: <Recipe /> },
      ],
    },
    {
      path: "login",
      element: <SignInPage/>
    }
  ],
  {
    basename: "/",
  }
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
